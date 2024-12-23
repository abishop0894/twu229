'use client'

import { useState } from 'react'
import Modal from 'react-modal'
import { parsePhoneNumber} from 'libphonenumber-js'
import { authenticator } from '@otplib/preset-default'
import { useRouter } from 'next/navigation'

// Array of authorized phone numbers (in production, this should be in a secure database)
const AUTHORIZED_NUMBERS = [
  '+12065550123',
  '+19088586819',
  // Add more numbers as needed
]

interface OtpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OtpModal({ isOpen, onClose }: OtpModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter()

  const handleSendOtp = () => {
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber, 'US').format('E.164')
      if (!AUTHORIZED_NUMBERS.includes(parsedNumber)) {
        alert('Phone number not found. Please speak with a union representative for access.')
        return
      }

      // Generate OTP (in production, this should be handled by a secure backend)
      const secret = authenticator.generateSecret()
      const generatedOtp = authenticator.generate(secret)
      
      // In production, send OTP via SMS using a service like Twilio
      console.log('OTP:', generatedOtp)
      setOtpSent(true)
      
      // Store secret in sessionStorage for verification
      sessionStorage.setItem('otpSecret', secret)
    } catch (error) {
      alert('Please enter a valid phone number')
    }
  }

  const handleVerifyOtp = () => {
    const secret = sessionStorage.getItem('otpSecret')
    if (!secret) return

    const isValid = authenticator.verify({
      token: otp,
      secret
    })

    if (isValid) {
      sessionStorage.setItem('surveyAuthorized', 'true')
      router.push('/polls/survey')
      onClose()
    } else {
      alert('Invalid OTP')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-md w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-xl"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Survey Access</h2>
      {!otpSent ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="+1 (206) 555-0123"
            />
          </div>
          <button
            onClick={handleSendOtp}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="123456"
            />
          </div>
          <button
            onClick={handleVerifyOtp}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </div>
      )}
    </Modal>
  )
} 