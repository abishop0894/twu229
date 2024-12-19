'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/executive-board', label: 'Executive Board' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/polls', label: 'Polls' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="fixed w-full bg-[#0a0086] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Container */}
          <div className="relative mt-[7vh]">
            <Link href="/" className="flex flex-col items-center bg-white text-[#0a0086] px-8 md:pt-[10vh] pt-6 pb-8 rounded-b-[100px] shadow-[0_10px_20px_rgba(0,0,0,0.25)] ">
              <span className="text-lg font-bold">Local 229</span>
              <div className="md:w-[160px] md:h-[160px] w-[90px] h-[90px] relative">
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
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#ffd700] transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
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
          className="md:hidden h-screen  opacity-90">
            <div
            className="px-2 pt-2 pb-3 flex flex-col items-end space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-white hover:text-[#ffd700] transition-colors duration-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 