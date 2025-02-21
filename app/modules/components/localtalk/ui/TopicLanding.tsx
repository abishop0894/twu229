'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { Topic, Category } from '@/lib/firebase/types'
import { getTopics } from '@/lib/firebase/operations'
import { Search,  } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import TopicCard from './TopicCard'
import { DocumentSnapshot } from 'firebase/firestore'

interface TopicFilter {
  category: Category | 'all'
  sortBy: 'newest' | 'oldest' | 'popular'
  search: string
}

export default function TopicLanding() {
  const router = useRouter()
  const [topics, setTopics] = useState<Topic[]>([])
  const [filter, setFilter] = useState<TopicFilter>({
    category: 'all',
    sortBy: 'newest',
    search: ''
  })
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>()
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  const loadTopics = async (isInitial = false) => {
    try {
      const limit = 12
      const { topics: newTopics, lastVisible } = await getTopics({
        lastDoc: isInitial ? undefined : lastDoc,
        limitCount: limit,
        category: filter.category === 'all' ? null : filter.category,
        sortBy: filter.sortBy
      })

      setTopics(prev => isInitial ? newTopics : [...prev, ...newTopics])
      setLastDoc(lastVisible)
      setHasMore(newTopics.length === limit)
    } catch (error) {
      console.error('Error loading topics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    setTopics([])
    setLastDoc(undefined)
    loadTopics(true)
  }, [filter.category, filter.sortBy])

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadTopics()
    }
  }, [inView])

  const filteredTopics = topics.filter(topic =>
    filter.search
      ? topic.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        topic.content.toLowerCase().includes(filter.search.toLowerCase())
      : true
  )

  return (
    <div className="space-y-6 mb-[5vh]">
      {/* Filter Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md p-4 rounded-lg">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                value={filter.search}
                onChange={e => setFilter(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={filter.category}
            onChange={e => setFilter(prev => ({ ...prev, category: e.target.value as Category | 'all' }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="transportation">Transportation</option>
            <option value="mow">MOW</option>
          </select>

          {/* Sort Options */}
          <select
            value={filter.sortBy}
            onChange={e => setFilter(prev => ({ ...prev, sortBy: e.target.value as TopicFilter['sortBy'] }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Comments</option>
          </select>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1  gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <TopicCard
                topic={topic}
                onPress={(id) => router.push(`/localtalk/topic/${id}`)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading States */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {!loading && hasMore && <div ref={ref} className="h-10" />}

      {/* Empty State */}
      {!loading && filteredTopics.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No topics found</p>
        </div>
      )}
    </div>
  )
} 