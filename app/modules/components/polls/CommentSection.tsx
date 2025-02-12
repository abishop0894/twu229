'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { addComment, getComments, updateCommentLikes, Comment } from '@/lib/firebase'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import Image from 'next/image'

const CommentSection = () => {
  const { user } = useUser()
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch comments on component mount
  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await getComments()
      setComments(fetchedComments)
    }
    loadComments()
  }, [])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !commentText.trim()) return

    setIsSubmitting(true)
    try {
      const newComment = {
        text: commentText.trim(),
        userEmail: user.primaryEmailAddress?.emailAddress || '',
        userAvatar: user.imageUrl || '',
        userName: user.fullName || '',
        timestamp: new Date().toISOString(),
        likes: 0,
        likedBy: []
      }

      await addComment(newComment)
      
      // Refresh comments
      const updatedComments = await getComments()
      setComments(updatedComments)
      setCommentText('')
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = async (commentId: string) => {
    if (!user) return

    try {
      const userEmail = user.primaryEmailAddress?.emailAddress || ''
      await updateCommentLikes(commentId, userEmail)
      
      // Refresh comments
      const updatedComments = await getComments()
      setComments(updatedComments)
    } catch (error) {
      console.error('Error liking comment:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      {/* Comment Input */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={user ? "Write a comment..." : "Please sign in to comment"}
          disabled={!user || isSubmitting}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
        />
        <button
          type="submit"
          disabled={!user || isSubmitting || !commentText.trim()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments Display */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-start space-x-3">
                <Image
                  src={comment.userAvatar}
                  alt={comment.userName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{comment.userName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center space-x-1"
                      disabled={!user}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          user && comment.likedBy.includes(user.primaryEmailAddress?.emailAddress || '')
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className="text-sm text-gray-500">{comment.likes}</span>
                    </button>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CommentSection
