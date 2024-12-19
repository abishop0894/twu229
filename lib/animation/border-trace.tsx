'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BorderTraceProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  borderColor?: string
}

export default function BorderTrace({ 
  children, 
  className = '', 
  duration = 0.8,
  delay = 0.2,
  borderColor = 'white'
}: BorderTraceProps) {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 0.3,
      transition: {
        duration,
        ease: "easeInOut",
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ 
          strokeWidth: 2,
          stroke: borderColor,
          fill: 'none',
          overflow: 'visible'
        }}
      >
        {/* Top line */}
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: delay }}
        />
        
        {/* Right line */}
        <motion.line
          x1="100%"
          y1="0"
          x2="100%"
          y2="100%"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: delay + duration }}
        />
        
        {/* Bottom line */}
        <motion.line
          x1="100%"
          y1="100%"
          x2="0"
          y2="100%"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: delay + (duration * 2) }}
        />
        
        {/* Left line */}
        <motion.line
          x1="0"
          y1="100%"
          x2="0"
          y2="0"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: delay + (duration * 3) }}
        />
      </svg>

      <div className="relative">
        {children}
      </div>
    </div>
  )
} 