'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const newsItems = [
  {
    title: 'New Contract Negotiations Begin',
    date: '2024-03-15',
    excerpt: 'Local 229 begins negotiations for improved wages and benefits...',
    link: '#'
  },
  {
    title: 'Safety Initiative Launch',
    date: '2024-03-10',
    excerpt: 'New workplace safety program implemented across transit facilities...',
    link: '#'
  },
  {
    title: 'Community Outreach Success',
    date: '2024-03-05',
    excerpt: 'Local 229 members volunteer at Hudson County food bank...',
    link: '#'
  }
]

const NewsUpdates = () => {
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
          {newsItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <time className="text-sm text-gray-500">{item.date}</time>
              <h3 className="text-xl font-bold text-[#0a0086] mt-2 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4">{item.excerpt}</p>
              <Link
                href={item.link}
                className="text-[#0a0086] hover:text-blue-900 font-semibold"
              >
                Read More →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsUpdates 