'use client'

import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface StaggerFadeProps {
  children: ReactNode
  className?: string
  delayOffset?: number
  staggerDelay?: number
}

export default function StaggerFade({ 
  children, 
  className = '',
  delayOffset = 0,
  staggerDelay = 0.2 
}: StaggerFadeProps) {
  const cubicBezier = [0.17, 0.55, 0.55, 1]

  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delayOffset,
        staggerChildren: staggerDelay,
      }
    }
  }

  // Child variants with the specified animation properties
  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier
      }
    }
  }

  // Wrap each child in a motion.div with the child variants
  const staggeredChildren = React.Children.map(children, (child) => (
    <motion.div variants={childVariants}>
      {child}
    </motion.div>
  ))

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {staggeredChildren}
    </motion.div>
  )
}
