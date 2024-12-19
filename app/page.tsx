import Hero from '@/app/modules/components/home/Hero'
import MissionStatement from '@/app/modules/components/home/MissionStatement'
import ExecutiveBoard from '@/app/modules/components/home/ExecutiveBoard'
import NewsUpdates from '@/app/modules/components/home/NewsUpdates'
import UpcomingEvents from '@/app/modules/components/home/UpcomingEvents'


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <MissionStatement />
      <ExecutiveBoard />
      <NewsUpdates />
      <UpcomingEvents />
  
    </div>
  )
}