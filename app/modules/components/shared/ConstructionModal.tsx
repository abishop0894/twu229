'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X } from 'lucide-react'

interface ConstructionModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConstructionModal = ({ isOpen, onClose }: ConstructionModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-[95%] text-center relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Settings className="w-16 h-16 text-[#0a0086]" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-[#0a0086] mb-3">Under Construction</h2>
            <p className="text-gray-600">Check back later</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConstructionModal 