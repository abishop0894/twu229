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
    question: 'How do I register for an event?',
    answer: 'You can register for events through our online registration form above. Make sure to have your membership number ready.',
    category: 'registration'
  },
  {
    id: '2',
    question: 'Can I bring guests to events?',
    answer: 'Yes, most events allow members to bring guests. The number of guests allowed may vary by event type. Please specify the number of guests during registration.',
    category: 'attendance'
  },
  {
    id: '3',
    question: 'What if I need to cancel my registration?',
    answer: 'You can cancel your registration up to 48 hours before the event by contacting our office or through your member portal.',
    category: 'registration'
  },
  {
    id: '4',
    question: 'Are there any costs associated with events?',
    answer: 'Most union meetings and training sessions are free for members. Special events may have a nominal fee, which will be clearly indicated during registration.',
    category: 'general'
  }
]

const EventFAQ = () => {
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
            Find answers to common questions about our events
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
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
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
            Still have questions?{' '}
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

export default EventFAQ 