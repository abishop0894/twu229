'use client'

import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// This would come from your CMS
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/twulocal229',
    icon: Facebook,
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/twulocal229',
    icon: Twitter,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/twulocal229',
    icon: Instagram,
    color: 'hover:text-pink-600'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/twulocal229',
    icon: Linkedin,
    color: 'hover:text-blue-700'
  }
]

const SocialMedia = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#0a0086] mb-6">Connect With Us</h2>
      <div className="grid grid-cols-2 gap-4">
        {socialLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors ${link.color}`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium">{link.name}</span>
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}

export default SocialMedia 