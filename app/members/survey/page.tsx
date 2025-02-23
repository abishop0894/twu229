"use client"

// import PollResults from "@/app/modules/components/polls/PollResults";
import GetInvolved from "@/app/modules/components/polls/GetInvolved";
import  SurveyComponent  from "@/app/modules/components/polls/SurveyComponent";
import PageLayout from "@/app/modules/layout/layout-comp";
import { SignedIn } from "@clerk/nextjs";
import SurveyResults from "@/app/modules/components/survey/SurveyResults";
import PollFAQ from "@/app/modules/components/polls/PollFAQ"; 
import SignInSection from "@/app/modules/components/auth/components/SignInSection";
export default function SurveyPage() {
  return (
  

      <PageLayout className="pt-[19vh]">
        <SignedIn>
          <SurveyComponent />
          {/* <PollResults /> */}
          <SurveyResults />
             <PollFAQ />
          <GetInvolved />   
        </SignedIn>
        <SignInSection />
      </PageLayout>
   

  )
}
