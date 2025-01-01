import Hero from '../modules/layout/Hero'
import History from '../modules/components/about/History'
import MissionValues from '../modules/components/home/MissionStatement'
import Impact from '../modules/components/about/Impact'
import Affiliations from '../modules/components/about/Affiliations'
import WhyJoinUs from '../modules/components/about/WhyJoinUs'
import PageLayout from '@/app/modules/layout/layout-comp'
import GetInvolved from '../modules/components/polls/GetInvolved'

export default function AboutPage() {
  return (
    <PageLayout className="pt-[12vh]">
      <Hero 
        title="About Us"
        description="TWU Local 229 is a dedicated union representing employees of the Hudson Bergen Light Rail. We are committed to fighting for the rights of our members and advocating for a better future for all."
        image="https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
      />
      <History />
      <MissionValues 
        customTitle="Mission & Values"
        customDescription="TWU Local 229 stands on the principles of solidarity, fairness, and worker empowerment. Our mission extends beyond traditional union representation to building a stronger, more equitable transit system for all of Hudson County."
      />
      <Impact />
      <Affiliations />

      <WhyJoinUs />
      <GetInvolved join />
    </PageLayout>
  )
}

