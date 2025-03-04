import Hero from '@/app/modules/components/home/Hero'
import MissionStatement from '@/app/modules/components/home/MissionStatement'
import ExecutiveBoard from '@/app/modules/components/home/ExecutiveBoard'
import NewsUpdates from '@/app/modules/components/home/NewsUpdates'
import UpcomingEvents from '@/app/modules/components/home/UpcomingEvents'
import PageLayout from '@/app/modules/layout/layout-comp'
import { CTASection } from '@/app/modules/components/home/CtaHome'
import GetInvolved from '@/app/modules/components/polls/GetInvolved'





export default function Home() {
  return (
    <>
      <PageLayout className="overflow-x-hidden">
        <Hero />
        <MissionStatement />
        <ExecutiveBoard />
        <NewsUpdates />
        <UpcomingEvents />
      <CTASection />
      <GetInvolved join={true} />
    </PageLayout>
    </>
  )
}
