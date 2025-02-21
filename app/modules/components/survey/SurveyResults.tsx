'use client'

import { useState, useEffect } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/firebase'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface SurveyResponse {
  responses: Record<number, string>
}

interface ResultData {
  [questionIndex: number]: {
    [choice: string]: number
  }
}

export default function SurveyResults() {
  const [resultData, setResultData] = useState<ResultData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      const q = query(collection(db, 'surveyResults'))
      const snapshot = await getDocs(q)
      
      const results: ResultData = {}
      
      snapshot.docs.forEach(doc => {
        const response = doc.data() as SurveyResponse
        Object.entries(response.responses).forEach(([questionIndex, choice]) => {
          const qIndex = parseInt(questionIndex)
          if (!results[qIndex]) {
            results[qIndex] = {}
          }
          results[qIndex][choice] = (results[qIndex][choice] || 0) + 1
        })
      })

      setResultData(results)
      setLoading(false)
    }

    fetchResults()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading results...</div>
  }

  const renderQuestionResults = (questionIndex: number, data: { [choice: string]: number }) => {
    const totalResponses = Object.values(data).reduce((sum, count) => sum + count, 0)
    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          label: `Question ${questionIndex + 1} Responses`,
          data: Object.values(data),
          backgroundColor: 'rgba(10, 0, 134, 0.6)',
          borderColor: 'rgba(10, 0, 134, 1)',
          borderWidth: 1,
          barThickness: 10,
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Question ${questionIndex + 1} Results`,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    }

    return (
      <div key={questionIndex} className="mb-12 flex flex-col w-full">
        <div className="h-[300px] mb-6 flex justify-center items-center">
          <Bar data={chartData} options={options} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 self-center items-center justify-center">
          {Object.entries(data).map(([choice, count]) => (
            <div key={choice} className="bg-white p-4 rounded-lg shadow">
              <div className="font-semibold mb-1">Choice: {choice}</div>
              <div className="text-sm text-gray-600">
                {count} responses ({((count / totalResponses) * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Survey Results</h2>
      {Object.entries(resultData).map(([questionIndex, data]) => 
        renderQuestionResults(parseInt(questionIndex), data)
      )}
    </div>
  )
} 