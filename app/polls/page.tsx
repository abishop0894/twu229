import Hero from '@/app/modules/layout/Hero'
import ActivePolls from '@/app/modules/components/polls/ActivePolls'
import PollResults from '@/app/modules/components/polls/PollResults'
import GetInvolved from '@/app/modules/components/polls/GetInvolved'
import PollFAQ from '@/app/modules/components/polls/PollFAQ'

// This would come from your CMS
const pageData = {
  hero: {
    title: "Weekly Member Polls",
    description: "Your voice matters. Participate in our weekly polls to help shape the direction of our union and make your opinion count.",
    image: "https://local229.s3.us-east-1.amazonaws.com/polls-hero.jpg"
  }
}

export default function PollsPage() {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      <ActivePolls />
      <PollResults />
      <GetInvolved />
      <PollFAQ />
    </div>
  )
}
