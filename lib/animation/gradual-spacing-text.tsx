'use client'

import { motion } from 'framer-motion'

interface GradualSpacingTextProps {
  text: string
  className?: string
}

export default function GradualSpacingText({ text, className }: GradualSpacingTextProps) {
  return (
    <motion.span
      initial={{ letterSpacing: '0em', opacity: 0 }}
      animate={{ letterSpacing: '0.1em', opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={className}
    >
      {text}
    </motion.span>
  )
}
