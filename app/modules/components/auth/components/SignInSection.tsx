"use client"
import Image from "next/image"
import { SignInButton, SignedOut } from "@clerk/nextjs"


const SignInSection = ({polls} : {polls: boolean}) => {
    return (
        <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-[calc(124vh+40vh)] -z-10">
            <div className="absolute inset-0 w-full -z-10">
              <Image 
                src="https://local229.s3.us-east-1.amazonaws.com/polls/hblr-train-approaching-the-essex-street-station-in-jersey-city-shutterstock-scaled.jpg"
                alt="TWU Background"
                fill
                className="object-cover -z-10"
              />
              <div className="absolute inset-0 bg-[#0a0086] opacity-60" />
            </div>
            <h1 className="text-2xl font-bold text-center text-white z-40">
              Please <span className="text-[#f5cc00]"><SignInButton>sign in</SignInButton></span> to {polls ? "view polls and statistics" : "view surveys and participate in discussions"} 
            </h1>
          </div>
        </SignedOut>
    )
}

export default SignInSection