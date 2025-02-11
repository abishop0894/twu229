import Hero from '@/app/modules/layout/Hero'
import UpcomingEvents from '@/app/modules/components/events/UpcomingEvents'
import PastEvents from '../modules/components/events/PastEvents'
import EventFAQ from '../modules/components/events/EventFAQ'
import PageLayout from '@/app/modules/layout/layout-comp'
import { getEvents } from '@/lib/firebase'
import GetInvolved from '../modules/components/polls/GetInvolved'
import { Suspense } from 'react'

// This would come from your CMS
const pageData = {
  hero: {
    title: "Events",
    description: "Join us for upcoming meetings, training sessions, and community gatherings. Your participation makes our union stronger.",
    image: "https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
  }
}

function EventSkeleton() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <PageLayout className="pt-[12vh]">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      <UpcomingEvents />
      <Suspense fallback={<EventSkeleton />}>
        <PastEvents events={events} />
      </Suspense>
      <GetInvolved rsvp />
      <EventFAQ />
    </PageLayout>
  )
}
