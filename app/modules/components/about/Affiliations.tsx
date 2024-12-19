'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const affiliates = [
  {
    name: 'Transport Workers Union of America',
    logo: 'https://local229.s3.us-east-1.amazonaws.com/twu-logo.png'
  },
  {
    name: 'AFL-CIO',
    logo: 'https://local229.s3.us-east-1.amazonaws.com/aflcio-logo.png'
  },
  {
    name: 'NJ State AFL-CIO',
    logo: 'https://local229.s3.us-east-1.amazonaws.com/nj-aflcio-logo.png'
  }
]

const Affiliations = () => {
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
            Our Affiliations
          </h2>
          <p className="text-lg text-gray-700">
            Proud to work alongside these organizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {affiliates.map((affiliate, index) => (
            <motion.div
              key={affiliate.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-48 h-48 mb-4">
                <Image
                  src={affiliate.logo}
                  alt={affiliate.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#0a0086]">
                {affiliate.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Affiliations 