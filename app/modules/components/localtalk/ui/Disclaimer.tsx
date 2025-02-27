'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const rules = [
  "You are a current member of TWU Local 229",
  "You will not share sensitive information discussed in this forum",
  "You will maintain professional conduct and respect towards fellow members",
  "You understand this is a moderated forum for union member discussion only",
  "You will not engage in harassment, discrimination, or hate speech",
  "You will not post misleading or false information",
  "You will not share login credentials or allow others to access your account",
  "You understand all posts and comments can be traced to your account",
  "Violating any of these terms subjects your account to restrictions or deletion"
]

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(false)

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('notifedOfDisclaimer229')
    if (!hasSeenDisclaimer) {
      setIsOpen(true)
    }
  }, [])

  const handleProceed = () => {
    localStorage.setItem('notifedOfDisclaimer229', 'true')
    setIsOpen(false)
  }

  const handleDeny = () => {
    window.location.href = '/' // Redirect to home page
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Before you use this application you certify that:
              </h2>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <ul className="space-y-4">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-blue-600 font-medium min-w-[24px]">
                    {index + 1}.
                  </span>
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>

            {/* Agreement Checkbox */}
            <div className="mt-8 flex items-center space-x-3">
              <input
                type="checkbox"
                id="agreement"
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="agreement" className="text-sm text-gray-700">
                I have read and agree to these terms
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 rounded-b-lg">
            <div className="flex space-x-4 justify-end">
              <button
                onClick={handleDeny}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Deny
              </button>
              <button
                onClick={handleProceed}
                disabled={!hasAgreed}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
