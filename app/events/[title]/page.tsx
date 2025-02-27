'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Event } from '@/lib/firebase'
import PageLayout from '@/app/modules/layout/layout-comp'
import { getEvents } from '@/lib/firebase'


export default function EventPage({ params }: { params: { title: string } }) {
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      const events = await getEvents()
      const decodedTitle = decodeURIComponent(params.title)
      const foundEvent = events.find(e => e.title === decodedTitle)
      if (foundEvent) setEvent(foundEvent)
    }
    fetchEvent()
  }, [params.title])

  if (!event) return null

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={event.images[0]}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {event.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90"
            >
              {event.date}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {event.images.map((media, index) => {
              const isVideo = media.toLowerCase().endsWith('.mp4')

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  {isVideo ? (
                    <video
                      src={media}
                      className="w-full h-full object-cover object-center"


                       controls
                    />
                  ) : (
                    <Image
                      src={media}
                      alt={`${event.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <div className="relative bg-white rounded-lg shadow-lg p-8 mt-4">
              <span className="absolute -top-6 left-4 text-6xl text-[#0a0086] font-sans">&quot;</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                {event.body}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
} 