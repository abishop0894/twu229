import Hero from '@/app/modules/layout/Hero'
import BoardMembers from '@/app/modules/components/executive-board/BoardMembers'
import LeadershipVision from '@/app/modules/components/executive-board/LeadershipVision'
import ContactBoard from '@/app/modules/components/executive-board/ContactBoard'
import PageLayout from '@/app/modules/layout/layout-comp'

export default function ExecutiveBoardPage() {
 const pageData = {
    hero: {
        title: "Meet Our Leadership",
        description: "Dedicated individuals working tirelessly to represent and protect the interests of our members at the Hudson Bergen Light Rail",
        image: "https://local229.s3.us-east-1.amazonaws.com/presidents.jpg"
    }
    }
 
    return (
    <PageLayout className="pt-[12vh]">
      <Hero 
        title={pageData.hero.title}
        description={pageData.hero.description}
        image={pageData.hero.image}
      />
      <BoardMembers />
      <LeadershipVision />
      <ContactBoard />
    </PageLayout>
  )
} 