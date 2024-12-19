import Hero from '@/app/modules/components/executive-board/Hero'
import BoardMembers from '@/app/modules/components/executive-board/BoardMembers'
import LeadershipVision from '@/app/modules/components/executive-board/LeadershipVision'
import ContactBoard from '@/app/modules/components/executive-board/ContactBoard'

export default function ExecutiveBoardPage() {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <Hero />
      <BoardMembers />
      <LeadershipVision />
      <ContactBoard />
    </div>
  )
} 