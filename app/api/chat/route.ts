import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: string; content: string }[]
    }

    const GITHUB_TOKEN = process.env.GITHUB_API_KEY

    if (!GITHUB_TOKEN || !GITHUB_TOKEN.startsWith("ghp_")) {
      return NextResponse.json(
        { error: "GitHub API key is missing or invalid." },
        { status: 401 }
      )
    }

    const userInput = messages?.at(-1)?.content?.trim() || ""

    // Case 1: Check if user input includes a specific repo reference
    const repoMatch = userInput.match(/([\w-]+)\/(\w[\w.-]*)/)

    if (repoMatch) {
      const [_, owner, repo] = repoMatch

      // Fetch repo details
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      })

      if (!repoRes.ok) {
        const errorText = await repoRes.text()
        throw new Error(`Repo fetch error: ${repoRes.status} ${errorText}`)
      }

      const repoData = await repoRes.json()

      // Try to fetch README
      let readmeSummary = "📘 README not available."
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      })

      if (readmeRes.ok) {
        const readmeData = await readmeRes.json()
        const decoded = Buffer.from(readmeData.content, "base64").toString("utf-8")
        readmeSummary = decoded.split("\n").slice(0, 10).join("\n")
      }

      return NextResponse.json({
        text: `📦 **${repoData.full_name}**\n📝 Description: ${repoData.description || "No description"}\n🏷️ Topics: ${(repoData.topics || []).join(", ") || "None"}\n⭐ Stars: ${repoData.stargazers_count}\n🍴 Forks: ${repoData.forks_count}\n🔗 URL: ${repoData.html_url}\n\n📘 **README Preview:**\n${readmeSummary}`,
      })
    }

    // Case 2: Perform GitHub search for repositories
    const encodedQuery = encodeURIComponent(userInput)
    const searchRes = await fetch(`https://api.github.com/search/repositories?q=${encodedQuery}&sort=stars&order=desc&per_page=3`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    })

    if (!searchRes.ok) {
      const errorText = await searchRes.text()
      throw new Error(`Search failed: ${searchRes.status} ${errorText}`)
    }

    const searchData = await searchRes.json()

    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json({ text: "🔍 No repositories found for your query." })
    }

    const results = searchData.items
      .map((repo: any, i: number) => {
        return `🔹 **${repo.full_name}**\n- ${repo.description || "No description"}\n- ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}\n- 🔗 ${repo.html_url}`
      })
      .join("\n\n")

    return NextResponse.json({
      text: `🔍 Top results for "${userInput}":\n\n${results}`,
    })
  } catch (error: any) {
    console.error("[GitHub Search Error]", error)
    return NextResponse.json(
      { error: `GitHub search failed: ${error.message}` },
      { status: 500 }
    )
  }
}