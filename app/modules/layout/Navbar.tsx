'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Fade as Hamburger } from 'hamburger-react'
import { Plus, Minus } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { SignedOut} from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'

import { SignInButton } from '@clerk/nextjs'
          

interface NavLink {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMediaOpen, setIsMediaOpen] = useState(false)

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/executive-board', label: 'Executive Board' },
    { href: '/about', label: 'About' },
    {
      label: 'Media',
      children: [
        { href: '/press', label: 'Press' },
        { href: '/events', label: 'Events' },
        { href: '/photos', label: 'Photos' },
        { href: '/member-highlights', label: 'Member Highlights' },
      ]
    },
    { href: '/polls', label: 'Polls' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="fixed w-full bg-[#0a0086] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-[13vh]">
          {/* Logo Container */}
          <div className="relative lg:mt-[7vh] mt-[3vh]">
            <Link href="/" className="flex flex-col items-center max-w-fit bg-white text-[#0a0086] lg:px-2 px-2 md:pt-[10vh] pt-6 pb-2 rounded-b-[100px] shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
                <span 
      className="text-lg font-bold relative"
      style={{
        color: '#ffd700',
        WebkitTextStroke: '1px #0a0086', // light gray
        stroke: '1px #0a0086'  // light gray
      }}
    >
      Local 229
    </span>
              <div className="lg:w-[160px] lg:h-[160px] w-[90px] h-[90px] relative">
                <Image
                  src="https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
                  alt="TWU Local 229 Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
                     
         
       

            {navLinks.map((link) => (
              'children' in link ? (
                <div key={link.label} className="relative group">
                  <button
                    className="text-white hover:text-[#ffd700] text-lg transition-colors duration-500 flex items-center gap-2"
                    onClick={() => setIsMediaOpen(!isMediaOpen)}
                  >
                    {link.label}
                    <svg 
                      className="w-4 h-4 transition-transform group-hover:rotate-180" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-10 w-screen rounded-md bg-[#211887] invisible group-hover:visible transition-all duration-300 shadow-lg -translate-x-1/2 transform">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                      <div className="grid grid-cols-2 gap-8">
                      
                
          

                        {link.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-white text-xl  hover:text-[#ffd700] transition-colors duration-500"
                          >
                            {child.label}
                           <hr className="w-[180px] h-[1px] bg-[#ffd700]"/> </Link>
                        
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href || ''}
                  className="text-white hover:text-[#ffd700] text-lg transition-colors duration-500"
                >
                  {link.label}
                </Link>
              )
            ))}
   <SignedOut>
              <SignInButton  >
                <button className="text-white hover:text-[#ffd700] text-lg transition-colors duration-500">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-center items-center">
              <SignedOut>
              <SignInButton  >
                <button className="text-white hover:text-[#ffd700] text-lg transition-colors duration-500">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Hamburger toggled={isOpen} toggle={setIsOpen} color="white" size={24} />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{opacity: -110, y: -20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{
              ease: "easeInOut",
              duration: 0.2,
            }}
            className="md:hidden h-screen opacity-90"
          >
            <div className="px-2 pt-[8vh] pb-3 flex flex-col items-start space-y-1">
                      
          
         

              {navLinks.map((link) => (
                'children' in link ? (
                  <div key={link.label} className="w-full flex justify-start items-start flex-col">
                    <button
                      className="w-full flex items-start gap-4 justify-start py-2 text-2xl px-[9px] text-white hover:text-[#ffd700] transition-colors duration-500"
                      onClick={() => setIsMediaOpen(!isMediaOpen)}
                    >
                      {link.label}
                      {isMediaOpen ? (
                        <Minus className="w-8 flex self-center h-8" />
                      ) : (
                        <Plus className="w-8 flex self-center h-8" />
                      )}
                      
                    </button>
                    
                    {isMediaOpen && (
                      <div className="">
                        {link.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-2 py-2 text-2xl text-white hover:text-[#ffd700] transition-colors duration-500"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                    <hr className="w-full h-[1px] bg-white"/>
                  </div>
                ) : (
                  <>
                  <Link
                    key={link.href}
                    href={link.href || ''}
                    className="block px-3 py-2 text-2xl text-white hover:text-[#ffd700] transition-colors duration-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  
                  </Link>
                       <hr className="w-full h-[1px] bg-white"/>
           </>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 