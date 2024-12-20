'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import { motion, AnimatePresence } from 'framer-motion'



export const PageLayout = ({ children, className }: {children : React.ReactNode, className?: string}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          exit={{ opacity: 0, }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className={`flex-grow ${className}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}


