"use client"
import Hero from '@/app/modules/layout/Hero'
import PageLayout from '@/app/modules/layout/layout-comp'
import MembersCta from '@/app/modules/components/members/ui/MembersCta'
const pageData = {
  hero: {
    title: "Members Portal",
    description: "Access your account, and participate in our polls and discussions.",
    image: "https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
  }
}

export default function PollsContent() {
 
  
  return (
    <PageLayout className="pt-[12vh]">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      <div>
      <MembersCta />
      </div>
   
    </PageLayout>
  )
} 