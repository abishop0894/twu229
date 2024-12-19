'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const events = [
  {
    title: 'Monthly Membership Meeting',
    date: '2024-04-01',
    time: '6:00 PM',
    location: 'Union Hall',
    description: 'Regular monthly meeting to discuss union business and updates.',
  },
  {
    title: 'Safety Training Workshop',
    date: '2024-04-15',
    time: '2:00 PM',
    location: 'Training Center',
    description: 'Mandatory safety training for all transit operators.',
  },
  {
    title: 'Family Picnic Day',
    date: '2024-05-01',
    time: '11:00 AM',
    location: 'Liberty State Park',
    description: 'Annual family gathering with food, games, and activities.',
  }
]

const UpcomingEvents = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-700">
            Stay connected with your union family
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#0a0086] text-white px-4 py-2 rounded-full text-sm">
                  {event.date}
                </div>
                <div className="text-gray-600">{event.time}</div>
              </div>
              <h3 className="text-xl font-bold text-[#0a0086] mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-2">{event.location}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <Link
                href="/events"
                className="text-[#0a0086] hover:text-blue-900 font-semibold"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/events"
            className="inline-block bg-[#0a0086] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
          >
            View All Events
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default UpcomingEvents 