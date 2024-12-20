'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    image: 'https://local229.s3.us-east-1.amazonaws.com/Hudson-Bergen-Light-Rail4.jpg',
    alt: 'TWU Local 229 Hero Image 1'
  },
  {
    image: 'https://local229.s3.us-east-1.amazonaws.com/lightrail.jpg',
    alt: 'TWU Local 229 Hero Image 2'
  },
  {
    image: 'https://local229.s3.us-east-1.amazonaws.com/5ENPLSJNOBCJ3HQSCVCLVZYWEY.jpeg',
    alt: 'TWU Local 229 Hero Image 3'
  }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Carousel */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 1000 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            x: currentSlide === index ? 0 : -1000,
            zIndex: currentSlide === index ? 10 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            loading="eager"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      ))}

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#0a0086]"
        style={{ opacity: 0.4, zIndex: 20 }}
      />

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We Move Hudson County
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transport Workers Union Local 229
        </motion.p>
        <motion.button
          className="bg-[#ffd700] text-[#0a0086] px-8 py-3 rounded-full text-lg font-bold hover:bg-yellow-400 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Us Today
        </motion.button>
      </div>
    </section>
  )
}

export default Hero 