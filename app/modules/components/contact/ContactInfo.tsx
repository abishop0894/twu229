'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

// This would come from your CMS
const contactDetails = {
  address: '50 Harrison Street, Hoboken, NJ 07030',
  phone: '(201) 555-0123',
  email: 'info@twulocal229.org',
  hours: 'Monday - Friday: 9:00 AM - 5:00 PM'
}


const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#0a0086] mb-6">Contact Information</h2>
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <MapPin className="w-6 h-6 text-[#0a0086] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Office Location</h3>
            <p className="text-gray-600">{contactDetails.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="w-6 h-6 text-[#0a0086] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600">{contactDetails.phone}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Mail className="w-6 h-6 text-[#0a0086] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600">{contactDetails.email}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="w-6 h-6 text-[#0a0086] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Office Hours</h3>
            <p className="text-gray-600">{contactDetails.hours}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactInfo 