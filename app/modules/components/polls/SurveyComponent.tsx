'use client'

import { getSurvey } from "@/lib/firebase"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { submitSurveyResponse } from "@/lib/firebase"

interface Survey {
  dateEnding: Date
  question: string[]
  answerChoices: { [key: string]: string }[]
}

function SurveyComponent() {
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const isComplete = useMemo(() => {
    if (!survey) return false
    return Object.keys(responses).length === survey.question.length
  }, [responses, survey])

  useEffect(() => {
    const fetchSurvey = async () => {
      const surveyData = await getSurvey()
      setSurvey(surveyData)
    }
    fetchSurvey()
  }, [])

  const handleSubmit = async () => {
    if (!survey || !isComplete) return
    setIsSubmitting(true)
    try {
      await submitSurveyResponse({
        id: crypto.randomUUID(),
        responses
      })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!survey) return <div>Loading...</div>

  const currentQuestion = survey.question[currentQuestionIndex]
  const currentAnswerChoices = survey.answerChoices[currentQuestionIndex]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#0a0086] mb-8">{`${survey.dateEnding}`}</h1>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl mb-4">{currentQuestion}</h2>
          <div className="space-y-3">
            {Object.entries(currentAnswerChoices).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  id={`choice-${index}`}
                  checked={responses[currentQuestionIndex] === value}
                  onChange={() => setResponses(prev => ({
                    ...prev,
                    [currentQuestionIndex]: value
                  }))}
                  className="mr-3"
                />
                <label htmlFor={`choice-${index}`} className="cursor-pointer">
                  {value}
                </label>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-[#0a0086] text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.min(survey.question.length - 1, prev + 1))}
          disabled={currentQuestionIndex === survey.question.length - 1}
          className={`px-4 py-2 bg-[#0a0086] text-white rounded disabled:opacity-50`}
        >
          Next
        </button>
      </div>

      {currentQuestionIndex === survey.question.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSubmit}
          disabled={!isComplete || isSubmitting}
          className="w-full mt-6 px-4 py-2 bg-[#0a0086] text-white rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Survey'}
        </motion.button>
      )}

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Submission received!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SurveyComponent