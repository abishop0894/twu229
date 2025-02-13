'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import { motion, AnimatePresence } from 'framer-motion'



const PageLayout = ({ children, className }: {children : React.ReactNode, className?: string}) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
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
          className={`flex-grow ${className} overflow-x-hidden`}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default PageLayout

