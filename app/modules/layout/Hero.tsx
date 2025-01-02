'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const Hero = ({ title, description, image }: { title?: string; description?: string; image?: string }) => {
  return (
    <section className="relative py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={"https://local229.s3.us-east-1.amazonaws.com/hblrnight.jpg"}
          alt="Background"
          fill
          className="object-cover "
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0086]/90 to-blue-900/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 [text-shadow:_0_3px_6px_rgba(0,0,0,0.161)]">
              {title || 'About TWU Local 229'}
            </h1>
            <p className="text-xl leading-relaxed [text-shadow:_0_3px_6px_rgba(0,0,0,0.161)]">
              {description || `Serving Hudson County's transit workers since our founding, 
              we've been at the forefront of worker rights and safety in 
              public transportation.`}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src={image || "https://local229.s3.us-east-1.amazonaws.com/TWU_Invincible.jpg"}
              alt="TWU Local 229 History"
              fill
              className="object-contain rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 