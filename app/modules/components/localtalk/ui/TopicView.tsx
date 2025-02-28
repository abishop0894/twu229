'use client'

import { useState, useEffect } from 'react'
import { Topic, } from '@/lib/firebase/types'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase/firebase'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import CommentSection from './CommentSection'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/lib/hooks/useUserData'
import { deleteTopic } from '@/lib/firebase/operations'
import { Trash2 } from 'lucide-react'

interface TopicViewProps {
  topicId: string
}

export default function TopicView({ topicId }: TopicViewProps) {
  const router = useRouter()
  const userData = useUserData()
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Real-time topic listener
    const unsubTopic = onSnapshot(
      doc(db, 'topics', topicId),
      (doc) => {
        if (doc.exists()) {
          setTopic({ id: doc.id, ...doc.data() } as Topic)
        }
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching topic:', error)
        setLoading(false)
      }
    )

    return () => unsubTopic()
  }, [topicId])

  const handleDeleteTopic = async () => {
    if (!userData || !topic) return
    if (!confirm('Are you sure you want to delete this topic? This will also delete all comments.')) return

    try {
      await deleteTopic(topicId, userData.id)
      router.push('/localtalk') // Redirect to main page after deletion
    } catch (error) {
      console.error('Error deleting topic:', error)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (!topic) {
    return <div>Topic not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
          <a
        href="/localtalk"
        className="mb-4 px-4 py-2 bg-[#0a0086] text-white rounded hover:bg-blue-900 transition-colors"
      >
        ← Back to LocalTalk
      </a>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        {/* Author Info */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <Image
              src={topic.userAvatar}
              alt={topic.username}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h2 className="font-semibold text-lg">{topic.username}</h2>
              <time className="text-gray-500">
                {formatDistanceToNow(topic.timestamp.toDate(), { addSuffix: true })}
              </time>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {userData?.id === topic?.userId && (
              <button
                onClick={handleDeleteTopic}
                className="flex items-center space-x-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
                <span>Delete Topic</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{topic.content}</p>
          </div>
        </div>

        {/* Media */}
        {topic.mediaUrl && (
          <div className="px-6 pb-6">
            {topic.mediaType === 'image' || topic.mediaType === 'gif' ? (
              <Image
                src={topic.mediaUrl}
                alt="Topic media"
                width={800}
                height={400}
                className="rounded-lg object-cover"
              />
            ) : (
              <video
                src={topic.mediaUrl}
                controls
                className="w-full rounded-lg max-h-[500px]"

              />
            )}
          </div>
        )}

        {/* Category */}
        <div className="px-6 pb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {topic.category}
          </span>
        </div>
      </motion.article>

      {/* Comments Section */}
      <CommentSection 
        topicId={topicId}
     
      />
    </div>
  )
} 