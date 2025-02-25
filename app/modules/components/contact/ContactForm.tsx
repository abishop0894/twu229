'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const Toast = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-4 right-4 bg-[#0a0086] text-white px-6 py-3 rounded-lg shadow-lg"
  >
    Message Sent
  </motion.div>
)

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3_KEY,
          subject: `Contact Form - ${formData.subject}`,
          from_name: formData.name,
          email: formData.email,
          message: `
            Name: ${formData.name}
            Email: ${formData.email}
            Subject: ${formData.subject}
            Message: ${formData.message}
          `
        }),
      })

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-[#0a0086] mb-6">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0a0086] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
      
      <AnimatePresence>
        {showToast && <Toast />}
      </AnimatePresence>
    </>
  )
}

export default ContactForm 