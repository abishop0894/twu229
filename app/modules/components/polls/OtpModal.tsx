import { useState } from 'react'
import Modal from 'react-modal'
import { parsePhoneNumber } from 'libphonenumber-js'

import { useVerification } from './context/verification'
// Array of authorized phone numbers (in production, this should be in a secure database)
const AUTHORIZED_NUMBERS = [
  '+12065550123',
  '+19088586819',
  // Add more numbers as needed
]

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface OtpModalProps {
  isOpen: boolean
  onClose: () => void
}


export default function OtpModal({ isOpen, onClose }: OtpModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
 
  const { setVerificationStatus } = useVerification()

  const handleSendOtp = async () => {
    try {
      setLoading(true)
      setError('')
      const parsedNumber = parsePhoneNumber(phoneNumber, 'US').format('E.164')

      if (!AUTHORIZED_NUMBERS.includes(parsedNumber)) {
        throw new Error('Phone number not authorized')
      }

      const response = await fetch(`${API_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: parsedNumber }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP')
      }

      setOtpSent(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send verification code')
    } finally {
      setLoading(false)
    }
  }

  

  const handleVerifyOtp = async () => {
    try {
      setLoading(true)
      setError('')
      const parsedNumber = parsePhoneNumber(phoneNumber, 'US').format('E.164')

      const response = await fetch(`${API_URL}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: parsedNumber,
          otp,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP')
      }

      setVerificationStatus('approved')
      onClose()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to verify code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Phone Verification</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {!otpSent ? (
        <div>
          <p className="mb-4">Please enter your phone number to receive a verification code.</p>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Code'}
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">Please enter the verification code sent to your phone.</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter verification code"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      )}
      <button
        onClick={onClose}
        className="mt-4 w-full border border-gray-300 p-2 rounded hover:bg-gray-100"
      >
        Cancel
      </button>
    </Modal>
  )
} 


// import { useState } from 'react'
// import Modal from 'react-modal'
// import { parsePhoneNumber } from 'libphonenumber-js'
// import { useRouter } from 'next/navigation'
// import { useVerification } from './context/verification'

// // Array of authorized phone numbers (in production, this should be in a secure database)
// const AUTHORIZED_NUMBERS = [
//   '+12065550123',
//   '+19088586819',
//   // Add more numbers as needed
// ]

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// interface OtpModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export default function OtpModal({ isOpen, onClose }: OtpModalProps) {
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [otpSent, setOtpSent] = useState(false)
//   const [otp, setOtp] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const { setVerificationStatus } = useVerification()
//   const router = useRouter()

//   const handleSendOtp = async () => {
//     try {
//       setLoading(true)
//       setError('')
//       const parsedNumber = parsePhoneNumber(phoneNumber, 'US').format('E.164')

//       if (!AUTHORIZED_NUMBERS.includes(parsedNumber)) {
//         throw new Error('Phone number not authorized')
//       }

//       const response = await fetch(`${API_URL}/api/send-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phoneNumber: parsedNumber }),
//       })

//       const data = await response.json()
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to send OTP')
//       }

//       setVerificationStatus(data.status)
//       setOtpSent(true)
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to send verification code')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleVerifyOtp = async () => {
//     try {
//       setLoading(true)
//       setError('')
//       const parsedNumber = parsePhoneNumber(phoneNumber, 'US').format('E.164')

//       const response = await fetch(`${API_URL}/api/verify-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           phoneNumber: parsedNumber,
//           otp,
//         }),
//       })

//       const data = await response.json()

//       if (response.status === 202) {
//         setVerificationStatus('pending')
//         return
//       }

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to verify OTP')
//       }

//       setVerificationStatus(data.status)

//       if (data.status === 'approved') {
//         sessionStorage.setItem('surveyAuthorized', 'true')
//         router.push('/polls/survey')
//         onClose()
//       }
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to verify code')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//     >
//       <h2 className="text-2xl font-bold mb-4">Phone Verification</h2>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       {!otpSent ? (
//         <div>
//           <p className="mb-4">Please enter your phone number to receive a verification code.</p>
//           <input
//             type="tel"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="Enter phone number"
//             className="w-full p-2 border rounded mb-4"
//           />
//           <button
//             onClick={handleSendOtp}
//             disabled={loading}
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? 'Sending...' : 'Send Code'}
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p className="mb-4">Please enter the verification code sent to your phone.</p>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter verification code"
//             className="w-full p-2 border rounded mb-4"
//           />
//           <button
//             onClick={handleVerifyOtp}
//             disabled={loading}
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? 'Verifying...' : 'Verify Code'}
//           </button>
//         </div>
//       )}
//       <button
//         onClick={onClose}
//         className="mt-4 w-full border border-gray-300 p-2 rounded hover:bg-gray-100"
//       >
//         Cancel
//       </button>
//     </Modal>
//   )
// } 