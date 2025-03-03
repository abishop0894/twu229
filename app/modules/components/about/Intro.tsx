'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getMemberHighlight } from '@/lib/firebase'
import type { MemberHighlight } from '@/lib/firebase'

const Intro = () => {
  const [member, setMember] = useState<MemberHighlight | null>(null)

  useEffect(() => {
    const fetchMember = async () => {
      const memberData = await getMemberHighlight()
      setMember(memberData)
    }
    fetchMember()
  }, [])

  if (!member) return null

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
              src={member.image}
              alt={`${member.firstName} ${member.lastName}`}
              fill
              className="object-cover object-center"
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
              Meet {member.firstName} {member.lastName}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-6">A proud member of TWU Local 229, and employee for <span className="font-bold text-[#0a0086]">{member.years} years</span></h3>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Intro
