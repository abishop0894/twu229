'use client'

import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0a0086] to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Our Leadership
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Dedicated individuals working tirelessly to represent and protect the interests 
            of our members in Hudson County
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 