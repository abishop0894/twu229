import Hero from '@/app/modules/components/home/Hero'
import MissionStatement from '@/app/modules/components/home/MissionStatement'
import ExecutiveBoard from '@/app/modules/components/home/ExecutiveBoard'
import NewsUpdates from '@/app/modules/components/home/NewsUpdates'
import UpcomingEvents from '@/app/modules/components/home/UpcomingEvents'
import { PageLayout } from '@/app/modules/layout/page-comp'

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <MissionStatement />
      <ExecutiveBoard />
      <NewsUpdates />
      <UpcomingEvents />
  
    </PageLayout>
  )
}