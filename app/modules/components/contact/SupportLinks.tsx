'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FileText, HelpCircle, Download, X } from 'lucide-react'
import { useState } from 'react'

// This would come from your CMS
const supportLinks = [
  {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions',
    href: '/faq',
    icon: HelpCircle
  },
  {
    title: 'Member Resources',
    description: 'Access important documents and forms',
    href: '/resources',
    icon: FileText
  },
  {
    title: 'Download Forms',
    description: 'Get necessary union forms and documents',
    href: '/downloads',
    icon: Download
  }
]

// FAQ Data
const faqData = [
  {
    question: "What are the benefits of joining TWU Local 229?",
    answer: "Members receive competitive wages, health benefits, retirement plans, and strong representation in workplace matters."
  },
  {
    question: "How do I become a member?",
    answer: "Contact our membership department or fill out the membership form on our Join page."
  },
  {
    question: "When are union meetings held?",
    answer: "Regular meetings are held monthly. Check the Events page for specific dates and times."
  },
  // Add more FAQs as needed
]

// Resources Data
const resourcesData = [
  {
    title: "Member Handbook",
    description: "Complete guide to member benefits and responsibilities",
    url: "/docs/handbook.pdf"
  },
 
]

// Forms Data
const formsData = [
  {
    title: "Membership Application",
    description: "New member registration form",
    url: "/forms/membership.pdf"
  },

]

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'faq' | 'resources' | 'forms'
}

const Modal = ({ isOpen, onClose, type }: ModalProps) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 top-[-10vh] flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-[95%] max-h-[80vh] overflow-y-auto m-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0a0086]">
                {type === 'faq' ? 'Frequently Asked Questions' : 
                 type === 'resources' ? 'Member Resources' : 
                 'Download Forms'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {type === 'faq' && (
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                      className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                    >
                      <span className="font-semibold">{faq.question}</span>
                      <span className="transform transition-transform duration-200" style={{
                        transform: openAccordion === index ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>▼</span>
                    </button>
                    <AnimatePresence>
                      {openAccordion === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="p-4 bg-white">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {type === 'resources' && (
              <div className="space-y-4">
                {resourcesData.length > 1 ? (
                  resourcesData.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-[#0a0086]">{resource.title}</h3>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </a>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No documents available at this time. Check back later.
                  </p>
                )}
              </div>
            )}

            {type === 'forms' && (
              <div className="space-y-4">
                {formsData.length > 1 ? (
                  formsData.map((form, index) => (
                    <a
                      key={index}
                      href={form.url}
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-[#0a0086]">{form.title}</h3>
                      <p className="text-gray-600 text-sm">{form.description}</p>
                    </a>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No documents available at this time. Check back later.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const SupportLinks = () => {
  const [modalType, setModalType] = useState<'faq' | 'resources' | 'forms' | null>(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-[#0a0086] mb-6">Quick Support Links</h2>
        <div className="space-y-4">
          {supportLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.button
                key={link.title}
                onClick={() => setModalType(link.href.replace('/', '') as 'faq' | 'resources' | 'forms')}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <Icon className="w-6 h-6 text-[#0a0086] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <Modal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || 'faq'}
      />
    </>
  )
}

export default SupportLinks 