'use client'

import { useState, useEffect } from 'react'
import { useUserData } from '@/lib/hooks/useUserData'
import { Comment } from '@/lib/firebase/types'
import { onSnapshot, collection, query, where, orderBy, getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase/firebase'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { Reply, Trash2, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CommentForm from './CommentForm'
import { deleteComment, toggleCommentLike } from '@/lib/firebase/operations'

interface CommentThreadProps {
  comment: Comment & { replies: Comment[] }
  level?: number
  onReply: (commentId: string, username: string) => void
  currentUserId?: string
}

interface UserInfo {
  firstName: string
  lastName: string
  imageUrl: string
}

interface LikeModalProps {
  likes: string[]
  onClose: () => void
  userInfo: { [key: string]: UserInfo }
}

const LikeModal = ({ likes, onClose, userInfo }: LikeModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Likes</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
      </div>
      <div className="p-4">
        {likes.map(userId => (

          <div key={userId} className="py-2 flex items-center space-x-3">
            {userInfo[userId] ? (
              <>
                <Image
                  src={userInfo[userId].imageUrl}
                  alt={`${userInfo[userId].firstName} ${userInfo[userId].lastName}`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">
                  {`${userInfo[userId].firstName} ${userInfo[userId].lastName}`}
                </span>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            )}
          </div>

        ))}
      </div>
    </div>
  </div>
)

const CommentThread = ({ comment, level = 0, onReply, currentUserId }: CommentThreadProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showLikes, setShowLikes] = useState(false)
  const [userInfo, setUserInfo] = useState<{ [key: string]: UserInfo }>({})

  const userData = useUserData()

  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    try {
      await deleteComment(comment.id, currentUserId!)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  const handleLike = async () => {

    if (!currentUserId || !userData) return
    
    try {
      await toggleCommentLike(comment.id, currentUserId)
      // Add current user info to the userInfo state immediately
      setUserInfo(prev => ({
        ...prev,
        [currentUserId]: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          imageUrl: userData.imageUrl
        }
      }))

    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!comment.likes?.length) return

      
      const newUserInfo: { [key: string]: UserInfo } = {}
      
      // Add current user's info if they've liked the comment
      if (userData && comment.likes.includes(userData.id)) {
        newUserInfo[userData.id] = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          imageUrl: userData.imageUrl
        }
      }
      
      // Fetch other users' info
      for (const userId of comment.likes) {
        if (!userInfo[userId] && userId !== userData?.id) {
          try {
            const userDoc = await getDoc(doc(db, 'users', userId))
            if (userDoc.exists()) {
              const data = userDoc.data()
              newUserInfo[userId] = {
                firstName: data.firstName,
                lastName: data.lastName,
                imageUrl: data.imageUrl
              }
            }
          } catch (error) {
            console.error('Error fetching user info:', error)
          }
        }
      }
      
      if (Object.keys(newUserInfo).length > 0) {
        setUserInfo(prev => ({ ...prev, ...newUserInfo }))
      }
    }

    fetchUserInfo()
  }, [comment.likes, userData])


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
            {comment.replies?.length > 0 && (
              <span className="text-gray-400">({comment.replies.length})</span>
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            {/* Like button */}
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
            >
              <Heart
                size={16}
                className={comment.likes?.includes(currentUserId || '') ? 'fill-red-500 text-red-500' : ''}
              />
            </button>

            {/* Likes list button */}
            {(comment.likes?.length || 0) > 0 && (
              <button
                onClick={() => setShowLikes(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                {comment.likes?.length} {comment.likes?.length === 1 ? 'like' : 'likes'}
              </button>
            )}
          </div>
          
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

        {showLikes && (
          <LikeModal
            likes={comment.likes || []}
            onClose={() => setShowLikes(false)}
            userInfo={userInfo}
          />
        )}

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