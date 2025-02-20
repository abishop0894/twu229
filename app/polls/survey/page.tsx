"use client"

// import PollResults from "@/app/modules/components/polls/PollResults";
import GetInvolved from "@/app/modules/components/polls/GetInvolved";
import  SurveyComponent  from "@/app/modules/components/polls/SurveyComponent";
import PageLayout from "@/app/modules/layout/layout-comp";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default function SurveyPage() {
  return (
  

      <PageLayout className="pt-[19vh]">
        <SignedIn>
          <SurveyComponent />
          {/* <PollResults /> */}
          
          <GetInvolved />   
        </SignedIn>
        <SignedOut>
    
          <div className="flex flex-col  items-center justify-center h-full">
            <div className="absolute inset-0 w-full h-[120vh]">
              <Image 
                src="https://local229.s3.us-east-1.amazonaws.com/polls/hblr-train-approaching-the-essex-street-station-in-jersey-city-shutterstock-scaled.jpg"
                alt="HBLR Train Background"
                fill
                className="object-cover h-full -z-10"
              />
              <div className="absolute inset-0 bg-[#0a0086] opacity-60" />
            </div>

            <h1 className="text-2xl font-bold text-center text-white z-40">Please <span className="text-[#f5cc00]"><SignInButton>sign in</SignInButton></span> to view this page</h1>
          </div>
      
        </SignedOut>
      </PageLayout>
   

  )
}
