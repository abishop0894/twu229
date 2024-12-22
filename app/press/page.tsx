import Hero from '@/app/modules/layout/Hero'

import GetInvolved from '@/app/modules/components/polls/GetInvolved'

import { PageLayout } from '@/app/modules/layout/page-comp'

// This would come from your CMS
const pageData = {
  hero: {
    title: "Press Releases",
    description: "Stay up-to-date with the latest news and updates about Local 229. Our press releases provide important information about our union's activities, achievements, and advocacy efforts.",
    image: "https://local229.s3.us-east-1.amazonaws.com/press-hero.jpg"
  }
}

export default function PollsPage() {
  return (
    <PageLayout className="pt-[12vh]">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
  
      <GetInvolved />
      
    </PageLayout>
  )
}
