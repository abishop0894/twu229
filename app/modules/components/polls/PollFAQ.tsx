'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// This interface would match your CMS schema
interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// This would come from your CMS
const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Who can participate in the polls?',
    answer: 'All active TWU Local 229 members in good standing are eligible to participate in our weekly polls.',
    category: 'eligibility'
  },
  {
    id: '2',
    question: 'How is voting anonymity maintained?',
    answer: 'While we verify membership status, individual votes are not linked to member identities. All voting data is encrypted and anonymized.',
    category: 'privacy'
  },
  {
    id: '3',
    question: 'When are new polls released?',
    answer: 'New polls are typically released every Monday morning and remain open for one week.',
    category: 'schedule'
  },
  {
    id: '4',
    question: 'How are poll topics chosen?',
    answer: 'Poll topics are selected based on current union issues, member suggestions, and executive board recommendations.',
    category: 'general'
  }
]

const PollFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700">
            Learn more about our polling process
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[#0a0086]">
                  {faq.question}
                </span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFAQ === faq.id ? 'auto' : 0,
                  opacity: openFAQ === faq.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Have more questions?{' '}
            <a
              href="/contact"
              className="text-[#0a0086] hover:text-blue-900 font-semibold"
            >
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PollFAQ 