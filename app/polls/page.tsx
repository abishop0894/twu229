"use client"
import Hero from '@/app/modules/layout/Hero'
import PollFAQ from '@/app/modules/components/polls/PollFAQ'
import PageLayout from '@/app/modules/layout/layout-comp'
import { useRouter } from 'next/navigation'

const pageData = {
  hero: {
    title: "Weekly Member Polls",
    description: "Your voice matters. Participate in our monthly polls to help shape the direction of our union and make your opinion count.",
    image: "https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
  }
}

export default function PollsContent() {
  const router = useRouter()
  
  return (
    <PageLayout className="pt-[12vh]">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-3xl font-bold text-center text-[#0a0086] mb-8">Monthly Poll Questionnaire</h2>
        <button
          onClick={() => router.push('/polls/survey')}
          className="px-8 py-4 bg-[#0a0086] text-white rounded-lg hover:bg-blue-900 transition-colors text-lg font-medium"
        >
          Start Survey 
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-3xl font-bold text-center text-[#0a0086] mb-8">229Talk</h2>
        <button
          onClick={() => router.push('/polls/survey')}
          className="px-8 py-4 bg-[#0a0086] text-white rounded-lg hover:bg-blue-900 transition-colors text-lg font-medium"
        >
          229Talk
        </button>
      </div>
      <PollFAQ />
    </PageLayout>
  )
} 