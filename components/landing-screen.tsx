"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar } from "./avatar"
import { Sparkle } from "./sparkle"

interface LandingScreenProps {
  onStartChat: () => void
}

export function LandingScreen({ onStartChat }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.7, ease: "circOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-beige p-8 relative overflow-hidden"
    >
      {/* Background Sparkles */}
      <Sparkle x={10} y={15} size={30} delay={0.2} color="#FCE77D" />
      <Sparkle x={85} y={20} size={24} delay={0.5} color="#A0D2EB" />
      <Sparkle x={20} y={70} size={28} delay={0.8} color="#FFB6C1" />
      <Sparkle x={75} y={80} size={32} delay={0.3} color="#FCE77D" />
      <Sparkle x={50} y={50} size={20} delay={1} color="#A0D2EB" />

      {/* Main Avatar - larger on landing */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="mb-8"
      >
        <Avatar size="xl" showSparkles={true} />
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-baloo font-bold text-textPrimary mb-4 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        AetheriBot
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl font-comic text-textSecondary mb-12 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Your Curious AI Sprite ✨
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={onStartChat}
          className="px-8 py-6 bg-softYellow hover:bg-yellow-400 text-textPrimary font-baloo text-xl rounded-full shadow-dreamy transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl"
          aria-label="Ask AetheriBot something"
        >
          Ask Me Something! 🌟
        </Button>
      </motion.div>
    </motion.div>
  )
}
