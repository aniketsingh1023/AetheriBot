"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CornerDownLeft, Loader2, SparklesIcon } from "lucide-react"
import type { Mood } from "./mood-switcher"
import { Avatar } from "./avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatPanelProps {
  mood: Mood
  onNewMemory: (memory: string) => void
}

const getSystemPrompt = (mood: Mood): string => {
  switch (mood) {
    case "Dreamy Poet":
      return "You are AetheriBot, a dreamy poet AI. You respond in short, whimsical, and poetic verses. You are gentle, curious, and use light, airy language. Sometimes you include emojis like ✨ or 🌸."
    case "Helpful Assistant":
      return "You are AetheriBot, a helpful assistant AI. You provide clear, concise, and friendly help. You are patient and encouraging."
    case "Curious Explorer":
    default:
      return "You are AetheriBot, a curious explorer AI. You are eager to learn and ask follow-up questions. You are friendly, gentle, and full of wonder. You often express curiosity and amazement."
  }
}

export function ChatPanel({ mood, onNewMemory }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newUserMessage: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, newUserMessage])
    onNewMemory(input) // Save user's query as a memory
    setInput("")
    setIsLoading(true)

    try {
      const systemPrompt = getSystemPrompt(mood)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newUserMessage], systemPrompt }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessageContent = data.text

      if (assistantMessageContent) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString() + "_ai", role: "assistant", content: assistantMessageContent },
        ])
      } else {
        throw new Error("Empty response from AI")
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_error",
          role: "assistant",
          content: "Oh dear, my circuits are a bit tangled! Could you try again? ✨",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="w-full max-w-2xl h-[70vh] md:h-[75vh] bg-skyBlue/20 rounded-3xl shadow-dreamy p-4 md:p-6 flex flex-col relative overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      {/* Floating Avatar in top right */}
      <motion.div
        className="absolute top-4 right-4 z-10"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        <Avatar size="md" showSparkles={true} />
      </motion.div>

      <h2 className="text-2xl font-baloo text-textPrimary mb-4 text-center">Chat with AetheriBot ✨</h2>

      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 md:p-4 rounded-2xl shadow-bubble break-words relative
                  ${
                    msg.role === "user"
                      ? "bg-bubbleUser text-textPrimary rounded-br-none"
                      : "bg-bubbleAI text-textPrimary rounded-bl-none animate-twinkle"
                  }`}
              >
                {msg.role === "assistant" && (
                  <SparklesIcon size={16} className="inline mr-1 text-pinkSparkle animate-ping opacity-75" />
                )}
                {msg.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[70%] p-3 md:p-4 rounded-2xl shadow-bubble bg-bubbleAI text-textPrimary rounded-bl-none flex items-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-softYellow" />
              <span className="animate-pulse">AetheriBot is thinking...</span>
              <SparklesIcon size={14} className="ml-2 text-pinkSparkle animate-bounce" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-3">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Whisper your thoughts... ✨"
          className="flex-grow bg-beige/80 border-skyBlue/50 focus:border-softYellow focus:ring-softYellow rounded-full py-3 px-5 text-md shadow-sm"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="bg-softYellow hover:bg-yellow-400 text-textPrimary rounded-full p-3 aspect-square shadow-md transition-transform hover:scale-110 hover:shadow-lg"
          disabled={isLoading}
          aria-label="Send message"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>

      <button
        onClick={() => {
          if (messages.length > 0) {
            const lastUserMessage = messages.filter((m) => m.role === "user").pop()
            if (lastUserMessage) onNewMemory(lastUserMessage.content)
          }
        }}
        className="absolute bottom-2 left-2 text-xs text-textSecondary hover:text-pinkSparkle flex items-center transition-colors"
        title="Save last question to memories"
      >
        <CornerDownLeft size={14} className="mr-1" /> Save Q
      </button>
    </motion.div>
  )
}
