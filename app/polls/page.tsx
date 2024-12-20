import Hero from '@/app/modules/layout/Hero'
import ActivePolls from '@/app/modules/components/polls/ActivePolls'
import PollResults from '@/app/modules/components/polls/PollResults'
import GetInvolved from '@/app/modules/components/polls/GetInvolved'
import PollFAQ from '@/app/modules/components/polls/PollFAQ'
import { PageLayout } from '@/app/modules/layout/page-comp'

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
    <PageLayout>
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      <ActivePolls />
      <PollResults />
      <GetInvolved />
      <PollFAQ />
    </PageLayout>
  )
}
