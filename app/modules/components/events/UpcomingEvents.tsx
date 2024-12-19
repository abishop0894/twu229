'use client'

import { motion } from 'framer-motion'
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'

// This interface would match your CMS schema
interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  category: string
  registrationLink: string
}

// This would come from your CMS
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Monthly Membership Meeting',
    date: '2024-04-15',
    time: '18:00',
    location: 'Union Hall, Jersey City',
    description: 'Regular monthly meeting to discuss union business and updates.',
    category: 'Meeting',
    registrationLink: '/events/register/1'
  },
  // Add more events...
]

const UpcomingEvents = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4 text-center">
            Upcoming Events
          </h2>
        </motion.div>

        <div className="grid gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0a0086] mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{event.description}</p>
                </div>
                <div className="mt-6 md:mt-0 md:ml-8">
                  <a
                    href={event.registrationLink}
                    className="inline-block bg-[#0a0086] text-white px-6 py-3 rounded-full hover:bg-blue-900 transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents 