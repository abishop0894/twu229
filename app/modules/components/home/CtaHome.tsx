"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'

export const CTASection = () => {
  return (
    <section className="py-20">
      {/* About Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row"
      >
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
          <Image
            src="https://local229.s3.us-east-1.amazonaws.com/presidents.jpg"
            alt="TWU Local 229 History"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-[#0a0086] p-12 lg:p-20 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Our Story</h3>
          <p className="text-white/90 mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Learn about our history, mission, and the people who make Local 229 strong.</p>
          <Link href="/about" className="text-white text-lg font-semibold hover:text-[#f5cc00] transition-colors">
            Learn More →
          </Link>
        </div>
      </motion.div>

      {/* Member Highlight Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row-reverse"
      >
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
          <Image
            src="https://local229.s3.us-east-1.amazonaws.com/bergenline.jpg"
            alt="TWU Local 229 Member"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-[#f5cc00] p-12 lg:p-20 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl font-bold text-[#0a0086] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Member Spotlight</h3>
          <p className="text-[#0a0086]/90 mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Meet our featured member and discover their unique HBLR journey.</p>
          <Link href="/about#member-highlight" className="text-[#0a0086] text-lg font-semibold hover:text-white transition-colors">
            Meet Them →
          </Link>
        </div>
      </motion.div>

      {/* Photos Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row"
      >
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
          <Image
            src="https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
            alt="TWU Local 229 Photos"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-gray-50 p-12 lg:p-20 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl font-bold text-[#0a0086] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Photo Gallery</h3>
          <p className="text-gray-600 mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Browse through moments captured by our members across HBLR.</p>
          <Link href="/photos" className="text-[#0a0086] text-lg font-semibold hover:text-blue-700 transition-colors">
            View Gallery →
          </Link>
        </div>
      </motion.div>

      {/* Polls Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row-reverse"
      >
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative bg-gray-50 flex items-center justify-center">
          <motion.div 
            className="w-64 h-64 flex items-end justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
          >
            {[40, 60, 80, 100].map((height, index) => (
              <motion.div
                key={index}
                className="w-8 bg-[#f5cc00] rounded-t-lg"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            ))}
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 bg-[#0a0086] p-12 lg:p-20 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Have Your Say
          </h3>
          <p className="text-white/90 mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            Participate in our polls and help shape the future of our union.
          </p>
          <Link href="/polls" className="text-white font-semibold hover:text-[#f5cc00] transition-colors">
            Vote Now →
          </Link>
        </div>
      </motion.div>
    </section>
  )
}