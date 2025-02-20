import { Suspense } from 'react'
import { getTopic } from '@/lib/firebase/operations'
import TopicView from '@/app/modules/components/localtalk/ui/TopicView'

interface TopicPageProps {
  params: {
    id: string
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
  
      <Suspense fallback={<div>Loading...</div>}>

        <TopicView topicId={params.id} />
      </Suspense>
    </div>
  )
}

// Optional: Add generateMetadata for SEO
export async function generateMetadata({ params }: TopicPageProps) {
  const topic = await getTopic(params.id)
  
  if (!topic) {
    return {
      title: 'Topic Not Found'
    }
  }

  return {
    title: topic.title,
    description: topic.content.slice(0, 160)
  }
} 