"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquareText, X } from "lucide-react"

interface MemoryBubbleProps {
  memory: string
  onDelete: () => void
}

export function MemoryBubble({ memory, onDelete }: MemoryBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const snippet = memory.length > 30 ? memory.substring(0, 27) + "..." : memory

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 bg-pinkSparkle/70 hover:bg-pinkSparkle text-white rounded-full shadow-bubble flex items-center space-x-2 transition-all duration-200 animate-twinkle"
        aria-label={`Memory: ${snippet}`}
      >
        <MessageSquareText size={18} />
        <span className="font-comic text-sm">{snippet}</span>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-beige p-4 rounded-lg shadow-dreamy border border-softYellow z-10"
          >
            <p className="text-textPrimary font-comic text-sm break-words">{memory}</p>
            <button
              onClick={onDelete}
              className="absolute top-1 right-1 text-textSecondary hover:text-red-500"
              aria-label="Delete memory"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
