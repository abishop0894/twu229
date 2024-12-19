'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const LeadershipVision = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-6">
              Our Vision for the Future
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                At TWU Local 229, we envision a future where every transit worker in 
                Hudson County enjoys fair wages, comprehensive benefits, and safe working 
                conditions. Our leadership team is committed to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Strengthening worker protections and rights</li>
                <li>Modernizing workplace safety standards</li>
                <li>Expanding professional development opportunities</li>
                <li>Building stronger community partnerships</li>
                <li>Ensuring transparent union operations</li>
              </ul>
              <p>
                Together, we are  building a stronger union that serves its members and 
                contributes to the growth of Hudson Countys transit system.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/leadership-vision.jpg"
              alt="TWU Local 229 Leadership Vision"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LeadershipVision 