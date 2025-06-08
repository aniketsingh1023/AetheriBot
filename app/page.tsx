"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LandingScreen } from "@/components/landing-screen"
import { ChatPanel } from "@/components/chat-panel"
import { MoodSwitcher, type Mood } from "@/components/mood-switcher"
import { MemoryBubble } from "@/components/memory-bubble"
import { Sparkle } from "@/components/sparkle" // Re-using Sparkle for background

const MAX_MEMORIES = 5

export default function AetheriBotPage() {
  const [showChat, setShowChat] = useState(false)
  const [currentMood, setCurrentMood] = useState<Mood>("Curious Explorer")
  const [memories, setMemories] = useState<string[]>([])

  useEffect(() => {
    // Load memories from localStorage on initial mount
    const storedMemories = localStorage.getItem("aetheribot_memories")
    if (storedMemories) {
      setMemories(JSON.parse(storedMemories))
    }
  }, [])

  const handleStartChat = () => {
    setShowChat(true)
  }

  const handleNewMemory = (memory: string) => {
    setMemories((prevMemories) => {
      const updatedMemories = [memory, ...prevMemories].slice(0, MAX_MEMORIES)
      localStorage.setItem("aetheribot_memories", JSON.stringify(updatedMemories))
      return updatedMemories
    })
  }

  const handleDeleteMemory = (index: number) => {
    setMemories((prevMemories) => {
      const updatedMemories = prevMemories.filter((_, i) => i !== index)
      localStorage.setItem("aetheribot_memories", JSON.stringify(updatedMemories))
      return updatedMemories
    })
  }

  return (
    <div className="relative min-h-screen bg-beige flex flex-col items-center justify-center overflow-hidden">
      {/* Background Sparkles for Chat View */}
      {showChat && (
        <>
          <Sparkle x={5} y={10} size={20} delay={0.1} color="#FCE77D" />
          <Sparkle x={90} y={15} size={18} delay={0.4} color="#A0D2EB" />
          <Sparkle x={15} y={80} size={22} delay={0.7} color="#FFB6C1" />
          <Sparkle x={80} y={85} size={24} delay={0.2} color="#FCE77D" />
        </>
      )}

      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div key="landing">
            <LandingScreen onStartChat={handleStartChat} />
          </motion.div>
        ) : (
          <motion.main
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full flex flex-col items-center p-4 md:p-6"
          >
            <ChatPanel mood={currentMood} onNewMemory={handleNewMemory} />
            <div className="mt-6 w-full max-w-2xl">
              <MoodSwitcher currentMood={currentMood} onMoodChange={setCurrentMood} />
            </div>
            {memories.length > 0 && (
              <motion.div
                className="mt-6 w-full max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-baloo text-textPrimary mb-3 text-center">Memory Bubbles</h3>
                <div className="flex flex-wrap justify-center gap-3 p-2 bg-skyBlue/10 rounded-lg">
                  <AnimatePresence>
                    {memories.map((mem, index) => (
                      <MemoryBubble key={index} memory={mem} onDelete={() => handleDeleteMemory(index)} />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
