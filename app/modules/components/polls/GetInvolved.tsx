'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SuggestionForm {
  name: string
  email: string
  topic: string
  description: string
}

const GetInvolved = () => {
  const [formData, setFormData] = useState<SuggestionForm>({
    name: '',
    email: '',
    topic: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // This would connect to your API/CMS
    console.log('Suggestion submitted:', formData)
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      topic: '',
      description: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Get Involved
          </h2>
          <p className="text-lg text-gray-700">
            Suggest topics for future polls and help shape our union&apos;s direction
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-lg"
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
            <label htmlFor="topic" className="block text-gray-700 mb-2">Poll Topic</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Why is this topic important?
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a0086] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
            >
              Submit Suggestion
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

export default GetInvolved 