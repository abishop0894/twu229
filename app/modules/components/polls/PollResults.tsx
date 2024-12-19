'use client'

import { motion } from 'framer-motion'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// This interface would match your CMS schema
interface PollResult {
  id: string
  question: string
  date: string
  options: {
    text: string
    votes: number
  }[]
  totalVotes: number
}

// This would come from your CMS
const recentPolls: PollResult[] = [
  {
    id: '1',
    question: "Preferred meeting location?",
    date: "2024-03-10",
    options: [
      { text: "Union Hall", votes: 45 },
      { text: "Community Center", votes: 30 },
      { text: "Transit Hub", votes: 25 }
    ],
    totalVotes: 100
  },
  // Add more past polls...
]

const PollResults = () => {
  const chartData = {
    labels: recentPolls[0].options.map(option => option.text),
    datasets: [
      {
        label: 'Votes',
        data: recentPolls[0].options.map(option => option.votes),
        backgroundColor: '#0a0086',
        borderColor: '#0a0086',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Recent Poll Results
          </h2>
          <p className="text-lg text-gray-700">
            See how our members voted on recent issues
          </p>
        </motion.div>

        {recentPolls.map((poll, index) => (
          <motion.div
            key={poll.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg mb-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#0a0086] mb-2">
                {poll.question}
              </h3>
              <p className="text-gray-600">
                Poll ended {new Date(poll.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Total votes: {poll.totalVotes}
              </p>
            </div>

            <div className="h-[300px]">
              <Bar data={chartData} options={chartOptions} />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {poll.options.map((option) => (
                <div
                  key={option.text}
                  className="bg-gray-50 p-4 rounded-lg text-center"
                >
                  <h4 className="font-semibold text-[#0a0086] mb-2">
                    {option.text}
                  </h4>
                  <p className="text-2xl font-bold">
                    {Math.round((option.votes / poll.totalVotes) * 100)}%
                  </p>
                  <p className="text-gray-600">
                    {option.votes} votes
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PollResults 