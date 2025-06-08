"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface AvatarProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showSparkles?: boolean
}

export function Avatar({ className = "", size = "md", showSparkles = true }: AvatarProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Avatar with floating animation */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* SVG Bird Avatar */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
          {/* Glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="bodyGradient" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FCE77D" />
              <stop offset="100%" stopColor="#F4D03F" />
            </radialGradient>
            <radialGradient id="bellyGradient" cx="50%" cy="60%" r="40%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="100%" stopColor="#FCE77D" />
            </radialGradient>
          </defs>

          {/* Bird Body */}
          <ellipse cx="50" cy="55" rx="25" ry="30" fill="url(#bodyGradient)" filter="url(#glow)" />

          {/* Bird Belly */}
          <ellipse cx="50" cy="60" rx="18" ry="20" fill="url(#bellyGradient)" />

          {/* Bird Head */}
          <circle cx="50" cy="35" r="20" fill="url(#bodyGradient)" filter="url(#glow)" />

          {/* Beak */}
          <polygon points="35,35 25,38 35,41" fill="#FF8C42" />

          {/* Eyes */}
          <circle cx="45" cy="30" r="4" fill="#2C3E50" />
          <circle cx="46" cy="28" r="1.5" fill="white" />

          {/* Wing */}
          <ellipse cx="65" cy="50" rx="12" ry="18" fill="#A0D2EB" opacity="0.8" />
          <ellipse cx="67" cy="52" rx="8" ry="12" fill="#87CEEB" opacity="0.6" />

          {/* Tail feathers */}
          <ellipse cx="25" cy="65" rx="8" ry="15" fill="#A0D2EB" opacity="0.7" transform="rotate(-30 25 65)" />
          <ellipse cx="22" cy="68" rx="6" ry="12" fill="#87CEEB" opacity="0.5" transform="rotate(-45 22 68)" />

          {/* Animated sparkles on the bird */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur="8s"
              repeatCount="indefinite"
            />
            <polygon points="70,25 72,30 77,30 73,33 75,38 70,35 65,38 67,33 63,30 68,30" fill="#FFB6C1" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </polygon>
          </g>

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="360 30 30;0 30 30"
              dur="6s"
              repeatCount="indefinite"
            />
            <polygon points="30,20 31,23 34,23 32,25 33,28 30,26 27,28 28,25 26,23 29,23" fill="#A0D2EB" opacity="0.7">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </polygon>
          </g>
        </svg>

        {/* Additional glow effect */}
        <div className="absolute inset-0 rounded-full bg-softYellow/20 blur-xl animate-pulse" />
      </motion.div>

      {/* Floating sparkles around avatar */}
      {showSparkles && (
        <>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.5,
            }}
          >
            <Sparkles size={16} className="text-pinkSparkle" fill="currentColor" />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -left-2"
            animate={{
              scale: [1, 0.6, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          >
            <Sparkles size={12} className="text-skyBlue" fill="currentColor" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-4"
            animate={{
              x: [0, 5, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.2,
            }}
          >
            <Sparkles size={10} className="text-softYellow" fill="currentColor" />
          </motion.div>
        </>
      )}
    </div>
  )
}
