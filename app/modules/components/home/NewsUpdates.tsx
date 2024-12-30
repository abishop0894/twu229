'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getArticles, Article } from '@/lib/firebase'

const NewsUpdates = () => {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await getArticles()
      // Get the 3 most recent articles
      const sortedArticles = result.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ).slice(0, 3)
      setArticles(sortedArticles)
    }
    fetchArticles()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-4">
            Latest News & Updates
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const formattedDate = new Date(article.date).toISOString().split('T')[0]
            return (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <time className="text-sm text-gray-500">{formattedDate}</time>
                <h3 className="text-xl font-bold text-[#0a0086] mt-2 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 mb-4">{article.paragraphOne}</p>
                <Link
                  href={`/press/${formattedDate}`}
                  className="text-[#0a0086] hover:text-blue-900 font-semibold"
                >
                  Read More →
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default NewsUpdates 