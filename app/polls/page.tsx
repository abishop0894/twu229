"use client"
import Hero from '@/app/modules/layout/Hero'
import PollFAQ from '@/app/modules/components/polls/PollFAQ'
import { PageLayout } from '@/app/modules/layout/layout-comp'
import { useState } from 'react'
import OtpModal from '@/app/modules/components/polls/OtpModal'
import SurveyComponent from '../modules/components/polls/SurveyComponent'
import { useVerification, VerificationProvider } from '../modules/components/polls/context/verification'

// This would come from your CMS
const pageData = {
  hero: {
    title: "Weekly Member Polls",
    description: "Your voice matters. Participate in our weekly polls to help shape the direction of our union and make your opinion count.",
    image: "https://local229.s3.us-east-1.amazonaws.com/polls-hero.jpg"
  }
}

function PollsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { verificationStatus } = useVerification()
  
  return (
    <PageLayout className="pt-[12vh]">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      {verificationStatus !== 'approved' && <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-3xl font-bold text-[#0a0086] mb-8">Weekly Poll Questionnaire</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-[#0a0086] text-white rounded-lg hover:bg-blue-900 transition-colors text-lg font-medium"
        >
          Start Survey 
        </button>
      </div> }
      {verificationStatus === 'approved' ? <SurveyComponent /> : <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      <PollFAQ />
    </PageLayout>
  )
}

export default function PollsPage() {
  return (
    <VerificationProvider>
      <PollsContent />
    </VerificationProvider>
  )
} 