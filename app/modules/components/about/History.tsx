'use client'

import { motion } from 'framer-motion'

const timelineEvents = [
  {
    year: '2004',
    title: 'Union Formation',
    description: 'TWU Local 229 was established to represent transit workers.'
  },
  {
    year: '2010s',
    title: 'Growth Period',
    description: 'Expansion of membership and influence in Hudson County.'
  },
  {
    year: '2020s',
    title: 'Modern Era',
    description: 'Adaptation to new transit technologies and worker needs.'
  },
  {
    year: 'Today',
    title: 'Current Impact',
    description: 'Continuing our mission of worker advocacy and safety.'
  }
]

const History = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-12 text-center"
        >
          Our History
        </motion.h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#0a0086] opacity-20" />
          
          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } items-center justify-center`}
              >
                <div className="w-5/12 text-right pr-8">
                  {index % 2 === 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-[#0a0086]">{event.year}</h3>
                      <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                      <p className="text-gray-600">{event.description}</p>
                    </>
                  )}
                </div>
                <div className="relative w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-[#0a0086] rounded-full" />
                </div>
                <div className="w-5/12 pl-8">
                  {index % 2 !== 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-[#0a0086]">{event.year}</h3>
                      <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                      <p className="text-gray-600">{event.description}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default History 