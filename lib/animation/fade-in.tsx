'use client'

import { useRef, ReactNode } from 'react'
import { motion, } from 'framer-motion'

interface FadeInProps {
  children: ReactNode
  picture?: boolean
  className?: string
  delay?: number
  onClick?: () => void
}







export default function FadeIn({ children, picture = false, className = '', delay = 0, onClick }: FadeInProps) {
  const ref = useRef(null)

 const cubicBezier = [0.17, 0.55, 0.55, 1];
  
 
    const animationOptions = {
     initial: { opacity: -30, y: picture ? 0 : 20 },
     whileInView: { opacity: 1, y: 0 },
     transition: { delay: delay, duration: 1, ease: cubicBezier },
     viewport: { once: true, amount: 0.2 } // animates only once with 0.2 threshold
    }
 
 return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={`${className}`}
     
      {...animationOptions}
    >
      {children}
    </motion.div>
  )
} 