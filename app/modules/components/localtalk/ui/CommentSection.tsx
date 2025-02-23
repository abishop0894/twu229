'use client'

import { useState, useEffect } from 'react'
import { useUserData } from '@/lib/hooks/useUserData'
import { Comment } from '@/lib/firebase/types'
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase/firebase'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { Reply, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CommentForm from './CommentForm'
import { deleteComment } from '@/lib/firebase/operations'

interface CommentThreadProps {
  comment: Comment & { replies: Comment[] }
  level?: number
  onReply: (commentId: string, username: string) => void
  currentUserId?: string
}

const CommentThread = ({ comment, level = 0, onReply, currentUserId }: CommentThreadProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    try {
      await deleteComment(comment.id, currentUserId!)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`pl-${level > 0 ? '4 md:pl-8' : '0'} ${level > 0 ? 'border-l-2 border-gray-100' : ''}`}
    >
      <div className={`p-4 bg-white rounded-lg ${level === 0 ? 'shadow-sm' : ''}`}>
        <div className="flex items-center space-x-3 mb-2">
          <Image
            src={comment.userAvatar}
            alt={comment.username}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex-grow">
            <span className="font-medium">{comment.username}</span>
            <time className="text-sm text-gray-500 ml-2">
              {formatDistanceToNow(comment.timestamp.toDate(), { addSuffix: true })}
            </time>
          </div>
          {comment.replies?.length > 0 && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-500 hover:text-blue-500 flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100"
            >
              {isCollapsed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12" />
                </svg>
              )}
              <span className="text-sm hidden sm:inline">
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            </button>
          )}
        </div>

        {comment.replyToUser && (
          <div className="text-sm text-gray-500 mb-2">
            Replying to @{comment.replyToUser}
          </div>
        )}

        <p className="text-gray-700 mb-3 break-words">{comment.content}</p>

        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={() => onReply(comment.id, comment.username)}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
          >
            <Reply size={16} />
            <span>Reply</span>
          </button>
          
          {currentUserId === comment.userId && (
            <button
              onClick={handleDelete}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          )}
        </div>

        {comment.replies?.length > 0 && (
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-4"
              >
                {comment.replies.map(reply => (
                  <CommentThread
                    key={reply.id}
                    comment={reply as Comment & { replies: Comment[] }}
                    level={level + 1}
                    onReply={onReply}
                    currentUserId={currentUserId}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}

export default function CommentSection({ topicId }: { topicId: string }) {
  const userData = useUserData()
  const [comments, setComments] = useState<Comment[]>([])
  const [replyTo, setReplyTo] = useState<{ id: string; username: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('topicId', '==', topicId),
      orderBy('timestamp', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newComments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Comment[]
        setComments(newComments)
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching comments:', error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [topicId])

  const buildCommentTree = (comments: Comment[]) => {
    const commentMap = new Map<string, Comment & { replies: Comment[] }>()
    const roots: (Comment & { replies: Comment[] })[] = []

    // Initialize all comments with empty replies array
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] })
    })

    // Build the tree structure
    comments.forEach(comment => {
      const node = commentMap.get(comment.id)!
      if (comment.parentCommentId) {
        const parent = commentMap.get(comment.parentCommentId)
        if (parent) {
          parent.replies.push(node)
        }
      } else {
        roots.push(node)
      }
    })

    return roots
  }

  const renderCommentThread = (
    comment: Comment & { replies: Comment[] },
    level: number = 0
  ) => (
    <div key={comment.id} className="space-y-4">
      <CommentThread
        comment={comment}
        level={level}
        onReply={(id, username) => setReplyTo({ id, username })}
        currentUserId={userData?.id}
      />
    </div>
  )

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  const commentTree = buildCommentTree(comments)

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      {userData && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <CommentForm
            topicId={topicId}
            currentUser={userData}
            replyTo={replyTo}
            onCancelReply={() => setReplyTo(null)}
          />
        </div>
      )}

      {/* Comments */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {commentTree.map(comment => renderCommentThread(comment))}
        </div>
      </AnimatePresence>

      {/* Empty State */}
      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  )
}