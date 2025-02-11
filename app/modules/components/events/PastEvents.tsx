'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Event } from '@/lib/firebase'

interface Props {
  events: Event[]
}

const PastEvents = ({ events }: Props) => {


  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Past Events
          </h2>
          <p className="text-lg text-gray-700">
            Relive our memorable moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.filter(event => new Date(event.date).getTime() < Date.now()).map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={event.images[0]}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0a0086] mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.date}</p>
                <Link
                  href={`/events/${encodeURIComponent(event.title)}`}
                  className="inline-block bg-[#0a0086] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors"
                >
                  View Event
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PastEvents 