'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Photo {
  src: string
  alt: string
  title?: string | false
  subtitle?: string | false
}

const ImageCarousel = ({ photos }: { photos: Photo[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalImage, setModalImage] = useState<Photo | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying, photos.length])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
    setIsPlaying(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    setIsPlaying(false)
  }

  return (
    <div className="relative w-full h-[80vh] bg-black bg-[url('https://local229.s3.us-east-1.amazonaws.com/twuBig.png')] bg-cover bg-center">
      {/* Main Carousel */}
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className={`absolute w-[95%] sm:w-[90%] h-full md:h-[90%] xl:h-fit md:w-[85%] max-w-6xl aspect-[16/9] cursor-pointer`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: index === currentIndex ? 1 : 0.5,
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 1 : 0,
              }}
              transition={{ type: "spring", damping: 20,  }}
              onClick={() => setModalImage(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading='eager'
                className="object-contain rounded-lg "
                priority={index === currentIndex}
              />
            
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
          >
            ←
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
          >
            →
          </motion.button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsPlaying(false)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-[95vw] h-[90vh] max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={modalImage.src}
                alt={modalImage.alt}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
              {(modalImage.title || modalImage.subtitle) && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm">
                  {modalImage.title && (
                    <h3 className="text-2xl font-semibold mb-2 text-white">{modalImage.title}</h3>
                  )}
                  {modalImage.subtitle && (
                    <p className="text-lg text-gray-200">{modalImage.subtitle}</p>
                  )}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setModalImage(null)
                }}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/10 
                         backdrop-blur-md text-white hover:bg-white/20 transition-colors"
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageCarousel
