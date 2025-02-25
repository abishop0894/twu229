'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface RegistrationForm {
  name: string
  email: string
  eventId: string
  membershipNumber: string
  guests: number
  specialRequirements: string
}

// This would come from your CMS
const availableEvents = [
  {
    id: '1',
    title: 'Monthly Membership Meeting - April 2024'
  },
  {
    id: '2',
    title: 'Safety Training Workshop'
  },
  {
    id: '3',
    title: 'Family Summer Picnic 2024'
  }
]

const EventRegistration = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    name: '',
    email: '',
    eventId: '',
    membershipNumber: '',
    guests: 0,
    specialRequirements: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // This would connect to your API/CMS
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
            Event Registration
          </h2>
          <p className="text-lg text-gray-700">
            Register for upcoming events and secure your spot
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
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
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
            <label htmlFor="eventId" className="block text-gray-700 mb-2">Select Event</label>
            <select
              id="eventId"
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            >
              <option value="">Choose an event</option>
              {availableEvents.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="membershipNumber" className="block text-gray-700 mb-2">
              Membership Number
            </label>
            <input
              type="text"
              id="membershipNumber"
              name="membershipNumber"
              value={formData.membershipNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-gray-700 mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="0"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="specialRequirements" className="block text-gray-700 mb-2">
              Special Requirements
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a0086] focus:border-transparent"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a0086] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
            >
              Register Now
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

export default EventRegistration 