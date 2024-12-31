'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getMemberHighlight } from '@/lib/firebase'
import type { MemberHighlight } from '@/lib/firebase'
const QandA = () => {
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
    <section className="relative py-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('https://local229.s3.us-east-1.amazonaws.com/bergenline.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#0a0086]/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
        >
          <p className="text-white font-semibold mb-2">
            <span className="font-bold text-[#0a0086] text-2xl">Q:</span> {member.questionOne}
          </p>
          <p className="text-white">
            <span className="font-bold text-[#f5cc00] text-2xl">A:</span> {member.answerOne}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
        >
          <p className="text-white font-semibold mb-2">
            <span className="font-bold text-[#0a0086] text-2xl">Q:</span> {member.questionTwo}
          </p>
          <p className="text-white">
            <span className="font-bold text-[#f5cc00] text-2xl">A:</span> {member.answerTwo}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
        >
          <p className="text-white font-semibold mb-2">
            <span className="font-bold text-[#0a0086] text-2xl">Q:</span> {member.questionThree}
          </p>
          <p className="text-white">
            <span className="font-bold text-[#f5cc00] text-2xl">A:</span> {member.answerThree}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
        >
          <p className="text-white font-semibold mb-2">
            <span className="font-bold text-[#0a0086] text-2xl">Q:</span> {member.questionFour}
          </p>
          <p className="text-white">
            <span className="font-bold text-[#f5cc00] text-2xl">A:</span> {member.answerFour}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default QandA 