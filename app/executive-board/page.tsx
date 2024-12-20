import Hero from '@/app/modules/components/executive-board/Hero'
import BoardMembers from '@/app/modules/components/executive-board/BoardMembers'
import LeadershipVision from '@/app/modules/components/executive-board/LeadershipVision'
import ContactBoard from '@/app/modules/components/executive-board/ContactBoard'
import { PageLayout } from '@/app/modules/layout/page'

export default function ExecutiveBoardPage() {
  return (
    <PageLayout>
      <Hero />
      <BoardMembers />
      <LeadershipVision />
      <ContactBoard />
    </PageLayout>
  )
} 