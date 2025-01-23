'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const executives = [
  {
    name: 'Steve Hamm',
    role: 'President',
    image: "https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
  },
  {
    name: 'Jose Garcia',
    role: 'Vice President',
    image: "https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
  },
  {
    name: 'Duane Boone',
    role: 'Vice President of MOW',
    image: "https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
  }
]

const ExecutiveBoard = () => {
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
            Executive Board
          </h2>
          <p className="text-lg text-gray-700">
            Meet the dedicated leaders who serve our members
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {executives.map((exec, index) => (
            <motion.div
              key={exec.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0a0086]">{exec.name}</h3>
                <p className="text-gray-600 mb-4">{exec.role}</p>
              </div>
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
            href="/executive-board"
            className="inline-block bg-[#0a0086] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
          >
            View Full Board
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ExecutiveBoard 