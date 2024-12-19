'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// This interface would match your CMS schema
interface PastEvent {
  id: string
  title: string
  date: string
  description: string
  images: string[]
  highlights: string[]
}

// This would come from your CMS
const pastEvents: PastEvent[] = [
  {
    id: '1',
    title: 'Annual Family Picnic 2023',
    date: '2023-09-15',
    description: 'A wonderful day of community, food, and fun with our union families.',
    images: [
      'https://local229.s3.us-east-1.amazonaws.com/events/picnic1.jpg',
      'https://local229.s3.us-east-1.amazonaws.com/events/picnic2.jpg',
      'https://local229.s3.us-east-1.amazonaws.com/events/picnic3.jpg',
    ],
    highlights: [
      'Over 200 members and families attended',
      'Activities for children of all ages',
      'Recognition ceremony for long-standing members'
    ]
  },
  // Add more past events...
]

const PastEvents = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const currentEvent = pastEvents[currentEventIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % currentEvent.images.length
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [currentEvent])

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Past Events Gallery
          </h2>
          <p className="text-lg text-gray-700">
            Relive our memorable moments together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            {currentEvent.images.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, x: 1000 }}
                animate={{
                  opacity: currentImageIndex === index ? 1 : 0,
                  x: currentImageIndex === index ? 0 : -1000,
                  zIndex: currentImageIndex === index ? 10 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={`${currentEvent.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-[#0a0086] mb-4">
              {currentEvent.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {new Date(currentEvent.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-6">
              {currentEvent.description}
            </p>
            <div className="space-y-2">
              {currentEvent.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#0a0086] rounded-full mr-3" />
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Event Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {pastEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentEventIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentEventIndex === index ? 'bg-[#0a0086]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PastEvents 