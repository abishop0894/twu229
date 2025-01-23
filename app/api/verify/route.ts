// import { NextResponse } from 'next/server'
// import twilio from 'twilio'

// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN
// const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

// const client = twilio(accountSid, authToken)

// export async function POST(request: Request) {
//   try {
//     const { phoneNumber, code } = await request.json()

//     // Format phone number to E.164 format
//     const formattedNumber = phoneNumber.startsWith('+1') ? phoneNumber : `+1${phoneNumber}`

//     // Verify the code
//     const verification = await client.verify.v2
//       .services(verifyServiceSid!)
//       .verificationChecks.create({
//         to: formattedNumber,
//         code: code
//       })

//     if (verification.status === 'approved') {
//       return NextResponse.json({ success: true, message: 'Phone number verified successfully' })
//     } else {
//       return NextResponse.json(
//         { success: false, message: 'Invalid verification code' },
//         { status: 400 }
//       )
//     }
//   } catch (error) {
//     console.error('Verification error:', error)
//     return NextResponse.json(
//       { success: false, message: 'Error verifying phone number' },
//       { status: 500 }
//     )
//   }
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const phoneNumber = searchParams.get('phoneNumber')

//     if (!phoneNumber) {
//       return NextResponse.json(
//         { success: false, message: 'Phone number is required' },
//         { status: 400 }
//       )
//     }

//     // Format phone number to E.164 format
//     const formattedNumber = phoneNumber.startsWith('+1') ? phoneNumber : `+1${phoneNumber}`

//     // Send verification code
//     const verification = await client.verify.v2
//       .services(verifyServiceSid!)
//       .verifications.create({
//         to: formattedNumber,
//         channel: 'sms'
//       })

//     console.log(verification)

//     return NextResponse.json({
//       success: true,
//       message: verification.status
//     })
//   } catch (error) {
//     console.error('Error sending verification:', error)
//     return NextResponse.json(
//       { success: false, message: 'Error sending verification code' },
//       { status: 500 }
//     )
//   }
// } 