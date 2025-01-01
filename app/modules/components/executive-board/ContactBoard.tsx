'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const ContactBoard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

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
          subject: `Executive Board Contact - ${formData.subject}`,
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
        // Could add success message UI here
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error:', error)
      // Could add error message UI here
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Contact the Board
          </h2>
          <p className="text-lg text-gray-700">
            Have questions or concerns? We are here to listen and help.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="grievance">Grievance</option>
              <option value="suggestion">Suggestion</option>
              <option value="other">Other</option>
            </select>
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
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a0086] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

export default ContactBoard 