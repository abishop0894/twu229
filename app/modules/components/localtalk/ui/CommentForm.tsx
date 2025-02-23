'use client'

import { useState } from 'react'
import { ClerkUser } from '@/lib/hooks/useUserData'
import { createComment } from '@/lib/firebase/operations'
import { X } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'

interface CommentFormProps {
  topicId: string
  currentUser: ClerkUser
  replyTo: { id: string; username: string } | null
  onCancelReply: () => void
}

export default function CommentForm({
  topicId,
  currentUser,
  replyTo,
  onCancelReply
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await createComment({
        topicId,
        userId: currentUser.id,
        username: currentUser.firstName + ' ' + currentUser.lastName,
        userAvatar: currentUser.imageUrl,
        content: content.trim(),
        timestamp: Timestamp.now(),
        parentCommentId: replyTo?.id || null,
        replyToUser: replyTo?.username || null,
        replyChain: [],
        likes: []
      })

      setContent('')
      if (replyTo) onCancelReply()
    } catch (error) {
      console.error('Error creating comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {replyTo && (
        <div className="flex items-center justify-between bg-blue-50 p-2 rounded-md">
          <span className="text-sm text-blue-600">
            Replying to @{replyTo.username}
          </span>
          <button
            type="button"
            onClick={onCancelReply}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex space-x-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={replyTo ? `Reply to @${replyTo.username}...` : "Write a comment..."}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  )
} 