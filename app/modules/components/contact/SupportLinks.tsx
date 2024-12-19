'use client'

import { motion } from 'framer-motion'
import { FileText, HelpCircle, Download } from 'lucide-react'

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

const SupportLinks = () => {
  return (
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
            <motion.a
              key={link.title}
              href={link.href}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon className="w-6 h-6 text-[#0a0086] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">{link.title}</h3>
                <p className="text-gray-600">{link.description}</p>
              </div>
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}

export default SupportLinks 