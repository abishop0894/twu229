'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// These interfaces would match your CMS schema
interface PollOption {
  id: string
  text: string
}

interface Poll {
  id: string
  question: string
  options: PollOption[]
  startDate: string
  endDate: string
  isActive: boolean
}

// This would come from your CMS
const currentPoll: Poll = {
  id: '1',
  question: "What time would you prefer for the monthly membership meetings?",
  options: [
    { id: '1', text: "6:00 PM" },
    { id: '2', text: "7:00 PM" },
    { id: '3', text: "8:00 PM" }
  ],
  startDate: '2024-03-18',
  endDate: '2024-03-24',
  isActive: true
}

const ActivePolls = () => {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOption) return

    // This would connect to your API/CMS
    console.log('Vote submitted:', selectedOption)
    setHasVoted(true)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            This Week&apos;s Poll
          </h2>
          <p className="text-lg text-gray-700">
            Poll active until {new Date(currentPoll.endDate).toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 p-8 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold text-[#0a0086] mb-6">
            {currentPoll.question}
          </h3>

          {!hasVoted ? (
            <form onSubmit={handleVote} className="space-y-4">
              {currentPoll.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    id={option.id}
                    name="poll-option"
                    value={option.id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-4 h-4 text-[#0a0086] border-gray-300 focus:ring-[#0a0086]"
                  />
                  <label htmlFor={option.id} className="ml-3 text-gray-700">
                    {option.text}
                  </label>
                </div>
              ))}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={!selectedOption}
                  className={`w-full py-3 rounded-full font-bold ${
                    selectedOption
                      ? 'bg-[#0a0086] text-white hover:bg-blue-900'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  Submit Vote
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-[#0a0086] font-semibold">
                Thank you for voting!
              </p>
              <p className="text-gray-600 mt-2">
                Results will be available when the poll closes.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ActivePolls 