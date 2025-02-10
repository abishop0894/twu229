"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from "react-icons/fa6";

const checkerVariants = {
  initial: {
    opacity: 0,
    clipPath: "inset(0 100% 100% 0)"
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0 0% 0% 0)",
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
}

const textContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.5
    }
  }
}

const textItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

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
        <motion.div 
          className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
          variants={checkerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            src="https://local229.s3.us-east-1.amazonaws.com/presidents.jpg"
            alt="TWU Local 229 History"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div 
          className="w-full lg:w-1/2 bg-[#0a0086] p-12 lg:p-20 flex flex-col justify-center"
          variants={textContainerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h3 variants={textItemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Our Story
          </motion.h3>
          <motion.p variants={textItemVariants} className="text-white/90 mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            Learn about our history, mission, and the people who make Local 229 strong.
          </motion.p>
          <motion.div variants={textItemVariants}>
            <Link href="/about" className="text-white text-xl font-semibold hover:text-[#f5cc00] transition-colors flex items-center gap-2">
              Learn More <FaArrowRightLong className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Member Highlight Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row-reverse"
      >
        <motion.div 
          className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
          variants={checkerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            src="https://local229.s3.us-east-1.amazonaws.com/bergenline.jpg"
            alt="TWU Local 229 Member"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div 
          className="w-full lg:w-1/2 bg-[#f5cc00] p-12 lg:p-20 flex flex-col justify-center"
          variants={textContainerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h3 variants={textItemVariants} className="text-4xl md:text-5xl font-bold text-[#0a0086] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Member Highlight
          </motion.h3>
          <motion.p variants={textItemVariants} className="text-[#0a0086]/90 mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            Meet our featured member and discover their unique HBLR journey.
          </motion.p>
          <motion.div variants={textItemVariants}>
            <Link href="/member-highlights" className="text-[#0a0086] text-xl font-semibold hover:text-white transition-colors flex items-center gap-2">
              Meet Them <FaArrowRightLong className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Photos Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row"
      >
        <motion.div 
          className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
          variants={checkerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            src="https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member9.jpg"
            alt="TWU Local 229 Photos"
            fill
            className="object-cover object-top"
          />
        </motion.div>
        <motion.div 
          className="w-full lg:w-1/2 bg-[#0a0086] p-12 lg:p-20 flex flex-col justify-center"
          variants={textContainerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h3 variants={textItemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Photo Gallery
          </motion.h3>
          <motion.p variants={textItemVariants} className="text-white mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            Browse through moments captured by our members across HBLR.
          </motion.p>
          <motion.div variants={textItemVariants}>
            <Link href="/photos" className="text-white text-xl font-semibold hover:text-[#f5cc00] transition-colors flex items-center gap-2">
              View Gallery <FaArrowRightLong className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
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
        <motion.div 
          className="w-full lg:w-1/2 bg-[#f5cc00] p-12 lg:p-20 flex flex-col justify-center"
          variants={textContainerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h3 variants={textItemVariants} className="text-4xl md:text-5xl font-bold text-[#0a0086] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Have Your Say
          </motion.h3>
          <motion.p variants={textItemVariants} className="text-[#0a0086] mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            Participate in our polls and help shape the future of our union.
          </motion.p>
          <motion.div variants={textItemVariants}>
            <Link href="/polls" className="text-[#0a0086] text-xl font-semibold hover:text-white transition-colors flex items-center gap-2">
              Vote Now <FaArrowRightLong className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}