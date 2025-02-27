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

const MembersCta = () => {
  return (
    <>
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
            <Link href="/members/survey" className="text-[#0a0086] text-xl font-semibold hover:text-white transition-colors flex items-center gap-2">
              Vote Now <FaArrowRightLong className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      {/*229Talk */}
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
            src="https://local229.s3.us-east-1.amazonaws.com/229+(1).png"
            alt="TWU Local 229 Photos"
            fill
            className="object-cover object-center"
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
           Discussion Board
          </motion.h3>
          <motion.p variants={textItemVariants} className="text-white mb-8 text-xl md:text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
           Discuss and share your thoughts with the community.
          </motion.p>
          <motion.div variants={textItemVariants}>
            <Link href="/localtalk" className="text-white text-xl font-semibold hover:text-[#f5cc00] transition-colors flex items-center gap-2">
              Access 229Talk <FaArrowRightLong className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default MembersCta