'use client'

import { SignedIn } from '@clerk/nextjs'
import TopicCreationForm from '../modules/components/localtalk/ui/TopicCreationForm'
import TopicLanding from '@/app/modules/components/localtalk/ui/TopicLanding'
import PageLayout from '@/app/modules/layout/layout-comp'
import { TopicProvider } from '@/lib/context/TopicContext'
import SignInSection from '../modules/components/auth/components/SignInSection'
import Disclaimer from '../modules/components/localtalk/ui/Disclaimer'

export default function LocalTalkPage() {
  return (
    <PageLayout className="pt-[19vh]">
      <div className="max-w-4xl mx-auto px-4">
        <SignedIn>
          <Disclaimer />
          <TopicProvider>
            <TopicCreationForm />
            <TopicLanding />
          </TopicProvider>
        </SignedIn>
        <SignInSection polls={false} />
      </div>
    </PageLayout>
  )
} 