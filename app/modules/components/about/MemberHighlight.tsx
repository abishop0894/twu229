'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const carouselImages = [
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member1.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member2.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member3.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member4.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member5.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member6.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member7.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member8.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member9.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member10.jpg",
    title: "Member Name",
    subtitle: "Member Position"
  }
]

const MemberHighlight = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-6">
              Member Highlight
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Each month, we celebrate a member who exemplifies the values and dedication
                that make TWU Local 229 strong. Our members are the backbone of HBLR&apos;s   transit system, and their stories inspire us all.
              </p>
              <p>
                Through these highlights, we showcase:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Outstanding service and dedication</li>
                <li>Community involvement and leadership</li>
                <li>Professional achievements</li>
                <li>Union participation and advocacy</li>
                <li>Personal growth and development</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundColor: '#0a0086',
              backgroundImage: `url(https://local229.s3.us-east-1.amazonaws.com/twuBig.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'      
            }}
            className="relative h-[400px]  rounded-lg overflow-hidden shadow-xl"
          >
            {carouselImages.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                  <p className="text-white text-sm">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MemberHighlight