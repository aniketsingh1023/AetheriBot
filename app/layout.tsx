import type React from "react"
import type { Metadata } from "next"
import { Baloo_Bhai_2, Comic_Neue } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const balooBhai2 = Baloo_Bhai_2({
  subsets: ["latin"],
  variable: "--font-baloo-bhai-2",
  weight: ["400", "700"],
})

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic-neue",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "AetheriBot – The Curious AI Sprite",
  description: "Chat with AetheriBot, your whimsical AI companion!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-beige font-sans antialiased", balooBhai2.variable, comicNeue.variable)}>
        {children}
      </body>
    </html>
  )
}
