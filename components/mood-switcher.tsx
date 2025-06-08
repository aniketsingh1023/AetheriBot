"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"

export type Mood = "Curious Explorer" | "Dreamy Poet" | "Helpful Assistant"
export const moods: Mood[] = ["Curious Explorer", "Dreamy Poet", "Helpful Assistant"]

interface MoodSwitcherProps {
  currentMood: Mood
  onMoodChange: (mood: Mood) => void
}

export function MoodSwitcher({ currentMood, onMoodChange }: MoodSwitcherProps) {
  return (
    <motion.div
      className="p-4 bg-skyBlue/30 rounded-xl shadow-md my-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-lg font-baloo text-textPrimary mb-3 text-center flex items-center justify-center">
        <Wand2 className="mr-2 text-pinkSparkle" />
        AetheriBot's Mood
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {moods.map((mood) => (
          <Button
            key={mood}
            onClick={() => onMoodChange(mood)}
            variant={currentMood === mood ? "default" : "outline"}
            size="sm"
            className={`font-comic rounded-full transition-all duration-200
              ${
                currentMood === mood
                  ? "bg-softYellow text-textPrimary shadow-lg scale-105 border-yellow-500"
                  : "bg-beige/50 hover:bg-beige text-textSecondary border-skyBlue/50"
              }`}
          >
            {mood}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}
