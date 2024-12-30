'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const Intro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 lg:order-1"
          >
            <Image
              src="https://local229.s3.us-east-1.amazonaws.com/TWU_Invincible.jpg"
              alt="TWU Local 229 Member"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-6">
              Meet John Smith
            </h2>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-[#0a0086] mb-2">
                 <span className="font-bold text-[#0a0086] text-2xl">Q:</span> What inspired you to join TWU Local 229?
                </p>
                <p className="">
                 <span className="font-bold text-[#f5cc00] text-2xl">A:</span>  Following in my father&apos;s footsteps, I joined TWU Local 229 to be part of a 
                  strong community that fights for workers&apos; rights and safety in transit.
                </p>
              </div>

              <div>
                <p className="text-[#0a0086] font-semibold mb-2">
                  <span className="font-bold text-[#0a0086] text-2xl">Q:</span> How has being a union member impacted your career?
                </p>
                <p className="">
                  <span className="font-bold text-[#f5cc00] text-2xl">A:</span>  The union has provided me with invaluable training opportunities and the 
                  security to focus on delivering the best service to our community.
                </p>
              </div>

              <div>
                <p className="text-[#0a0086] font-semibold mb-2">
                  <span className="font-bold text-[#0a0086] text-2xl">Q:</span> What&apos;s your proudest moment as a TWU member?
                </p>
                <p className="">
                  <span className="font-bold text-[#f5cc00] text-2xl">A:</span>  Leading our safety committee to implement new protocols that have significantly 
                  reduced workplace incidents and improved conditions for all members.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Intro
