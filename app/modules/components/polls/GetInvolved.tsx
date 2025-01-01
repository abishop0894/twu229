'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SuggestionForm {
  name: string
  email: string
  topic: string
  description: string
}

interface Props {
  photo?: boolean
  highlight?: boolean
  join?: boolean
  suggestions?: boolean
  rsvp?: boolean
}

const GetInvolved = ({ photo, highlight, join, suggestions, rsvp }: Props) => {
  const [formData, setFormData] = useState<SuggestionForm>({
    name: '',
    email: '',
    topic: '',
    description: ''
  })

  const getFormTitle = () => {
    if (photo) return "Share Your Moments"
    if (highlight) return "Be Our Next Member Highlight"
    if (join) return "Join Local 229"
    if (suggestions) return "Let Your Voice Be Heard"
    if (rsvp) return "Join Us At Our Next Event"
    return "Get Involved"
  }

  const getFormSubtext = () => {
    if (photo) return "Want your photos featured in this section? Let us know!"
    if (highlight) return "Share your story and inspire others"
    if (join) return "Take the first step towards a stronger future"
    if (suggestions) return "Suggest topics for future polls and help shape our union's direction"
    if (rsvp) return "Reserve your spot at our upcoming events"
    return "Get involved with your union"
  }

  const getTopicLabel = () => {
    if (photo) return "Photo Description"
    if (highlight) return "Years of Service"
    if (join) return "Current Position"
    if (suggestions) return "Poll Topic"
    if (rsvp) return "Event Name"
    return "Topic"
  }

  const getDescriptionLabel = () => {
    if (photo) return "Tell us about your photo"
    if (highlight) return "Tell us your HBLR story"
    if (join) return "Why do you want to join?"
    if (suggestions) return "Why is this topic important?"
    if (rsvp) return "Message"
    return "Description"
  }

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
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
            {getFormTitle()}
          </h2>
          <p className="text-lg text-gray-700">
            {getFormSubtext()}
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
            <label htmlFor="topic" className="block text-gray-700 mb-2">{getTopicLabel()}</label>
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
              {getDescriptionLabel()}
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
              Submit
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

export default GetInvolved 