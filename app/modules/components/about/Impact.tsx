'use client'

import { motion } from 'framer-motion'
import { NumberTicker } from '../number-ticker'

const achievements = [
  {
    stat: Number(85),
    metric: '%',
    title: 'Member Satisfaction',
    description: 'Of our members report high satisfaction with union representation'
  },
  {
    stat: Number(32),
    metric: '$/hr',
    title: 'Average Wage',
    description: 'Competitive wages negotiated for our members'
  },
  {
    stat: '24/7',
    title: 'Support Available',
    description: 'Round-the-clock assistance for our members'
  },
  {
    stat: Number(100),
    title: 'Active Members',
    metric: '+',
    description: 'Growing stronger together each year'
  }
]

const Impact = () => {
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
            Our Impact
          </h2>
          <p className="text-lg text-gray-700">
            Making a difference in the lives of transit workers and their families
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              { typeof item.stat === 'number' ?
            
                <div className="items-center justify-center flex-row gap-1">
                <NumberTicker className="text-4xl font-bold text-[#0a0086] mb-2" value={item.stat} />
                <span className="text-4xl font-bold text-[#0a0086] mb-2">{item.metric}</span>
                </div>
                : 
                <div className="text-4xl font-bold text-[#0a0086] mb-2">
                  {item.stat}
                </div>
              }
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Impact 