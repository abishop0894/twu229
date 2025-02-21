'use client'

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import TopicCreationForm from '../modules/components/localtalk/ui/TopicCreationForm'
import TopicLanding from '@/app/modules/components/localtalk/ui/TopicLanding'
import PageLayout from '@/app/modules/layout/layout-comp'
import Image from 'next/image'
import { TopicProvider } from '@/lib/context/TopicContext'

export default function LocalTalkPage() {
  return (
    <PageLayout className="pt-[19vh]">
      <div className="max-w-4xl mx-auto px-4">
        <SignedIn>
          <TopicProvider>
            <TopicCreationForm />
            <TopicLanding />
          </TopicProvider>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col items-center justify-center h-[120vh]">
            <div className="absolute inset-0 w-full h-[120vh]">
              <Image 
                src="https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
                alt="TWU Background"
                fill
                className="object-cover h-full -z-10"
              />
              <div className="absolute inset-0 bg-[#0a0086] opacity-60" />
            </div>
            <h1 className="text-2xl font-bold text-center text-white z-40">
              Please <span className="text-[#f5cc00]"><SignInButton>sign in</SignInButton></span> to view and participate in discussions
            </h1>
          </div>
        </SignedOut>
      </div>
    </PageLayout>
  )
} 