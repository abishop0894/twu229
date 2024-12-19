import Hero from '../modules/layout/Hero'
import History from '../modules/components/about/History'
import MissionValues from '../modules/components/home/MissionStatement'
import Impact from '../modules/components/about/Impact'
import Affiliations from '../modules/components/about/Affiliations'
import WhyJoinUs from '../modules/components/about/WhyJoinUs'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <Hero />
      <History />
      <MissionValues 
        customTitle="Mission & Values"
        customDescription="TWU Local 229 stands on the principles of solidarity, fairness, and worker empowerment. Our mission extends beyond traditional union representation to building a stronger, more equitable transit system for all of Hudson County."
      />
      <Impact />
      <Affiliations />
      <WhyJoinUs />
    </div>
  )
}
