// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const twilio = require('twilio');

// const app = express();
// const port = process.env.PORT || 3001;

// // Twilio client setup
// const client = require('twilio')(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN,
// );

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Generate a 6-digit OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // Store OTPs temporarily (in production, use a proper database)
// const otpStore = new Map();

// // Route to send OTP
// app.post('/api/send-otp', async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
    
//     const verification = await client.verify.v2
//       .services("VA8eb4b61136996600040dcf0ee3296058")
//       .verifications
//       .create({
//         to: phoneNumber,
//         channel: 'sms'
//       });

//     res.json({ 
//       success: true, 
//       message: 'Verification code sent successfully',
//       status: verification.status 
//     });
//   } catch (error) {
//     console.error('Error sending verification:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Failed to send verification code' 
//     });
//   }
// });

// // Route to verify code
// app.post('/api/verify-otp', async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
    
//     const verificationCheck = await client.verify.v2
//       .services("VA8eb4b61136996600040dcf0ee3296058")
//       .verificationChecks
//       .create({
//         code: "123456",
//         to: phoneNumber,
//       });

//     // Wait 3 seconds before checking status
//     await new Promise(resolve => setTimeout(resolve, 3000));

//     if (verificationCheck.status === 'pending') {
//       return res.status(202).json({
//         success: false,
//         message: 'Verifying...',
//         status: verificationCheck.status
//       });
//     }

//     if (verificationCheck.status === 'approved') {
//       return res.json({ 
//         success: true, 
//         message: 'Verification successful',
//         status: verificationCheck.status
//       });
//     } 

//     return res.status(400).json({ 
//       success: false, 
//       message: 'Invalid verification code',
//       status: verificationCheck.status
//     });
//   } catch (error) {
//     console.error('Error verifying code:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Failed to verify code'
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// }); 

//uncomment this to run the server