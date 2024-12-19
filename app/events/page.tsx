import Hero from '@/app/modules/layout/Hero'
import UpcomingEvents from '@/app/modules/components/events/UpcomingEvents'
import PastEvents from '../modules/components/events/PastEvents'
import EventRegistration from '../modules/components/events/EventRegistration'
import EventFAQ from '../modules/components/events/EventFAQ'

// This would come from your CMS
const pageData = {
  hero: {
    title: "Stay Connected with Our Events",
    description: "Join us for upcoming meetings, training sessions, and community gatherings. Your participation makes our union stronger.",
    image: "https://local229.s3.us-east-1.amazonaws.com/events-hero.jpg"
  }
}

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      <UpcomingEvents />
      <PastEvents />
      <EventRegistration />
      <EventFAQ />
    </div>
  )
}
