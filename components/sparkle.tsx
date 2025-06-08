"use client"

import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface SparkleProps {
  size?: number
  color?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
}

export function Sparkle({ size = 24, color = "#FFB6C1", delay = 0, duration = 1.5, x = 0, y = 0 }: SparkleProps) {
  return (
    <motion.div
      style={{ position: "absolute", top: `${y}%`, left: `${x}%` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <Sparkles size={size} color={color} fill={color} />
    </motion.div>
  )
}
