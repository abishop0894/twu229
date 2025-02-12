  'use client'

  import { motion } from 'framer-motion'
  import { CalendarIcon, MapPinIcon } from 'lucide-react'
  import { useState, useEffect } from 'react'
  import Image from 'next/image'
  import { getEvents, Event } from '@/lib/firebase'

  // This interface would match your CMS schema


  // This would come from your CMS


  const UpcomingEvents = () => {
    const [currentEventIndex, setCurrentEventIndex] = useState(0)
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
      const fetchEvents = async () => {
        const result = await getEvents()
        // Filter for future events
        const futureEvents = result.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate > new Date()
        })
        setEvents(futureEvents)
      }
      fetchEvents()
    }, [])

    // Auto-rotate through events
    useEffect(() => {
      if (!events.length) return
      
      const timer = setInterval(() => {
        setCurrentEventIndex((prev) => 
          (prev + 1) % events.length
        )
      }, 30000) // Change event every 30 seconds
      return () => clearInterval(timer)
    }, [events.length])

    if (!events.length) return <div>Loading...</div>

    const currentEvent = events[currentEventIndex]

    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-700">
              Join us at our next union gathering
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="max-w-3xl mx-auto">
              <motion.div
                key={currentEvent.title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden"
              >
                {currentEvent.images.length > 0 && (
                  <div className="relative lg:h-[40vh] h-[50vh] bg-[#0a0086]/70">
                    <Image
                      src={currentEvent.images[0]}
                      alt={currentEvent.title}
                      fill
                      className="object-contain "
                    />
                  </div>
                )}
                <div className="p-6 text-wrap">
                  <h3 className="text-2xl font-bold text-[#0a0086] mb-2">
                    {currentEvent.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    {new Date(currentEvent.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-[#0a0086] mb-4">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {currentEvent.location}
                  </div>
                  <p className="text-gray-700 mb-6 text-wrap break-words whitespace-pre-wrap">
                    {currentEvent.body.split(' ').map((word, index) => {
                      if (word.includes('www') || word.includes('http') || word.includes('https')) {
                        return <a key={index} href={word.startsWith('https') ? word : `https://${word}` } className="text-[#0a0086] break-all hover:underline" target="_blank" rel="noopener noreferrer">{word} </a>
                      }
                      return word + ' '
                    })}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Event Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentEventIndex === index ? 'bg-[#0a0086]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  export default UpcomingEvents 