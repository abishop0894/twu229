import { Timestamp } from 'firebase/firestore'

export type Category = 'mow' | 'transportation'
export type MediaType = 'image' | 'video' | 'gif'

export interface Topic {
  id: string
  userId: string
  username: string
  userAvatar: string
  title: string
  content: string
  category: Category
  mediaUrl?: string
  mediaType?: MediaType
  timestamp: Timestamp
  commentCount: number
}

export interface Comment {
  id: string
  topicId: string
  userId: string
  username: string
  userAvatar: string
  content: string
  timestamp: Timestamp
  parentCommentId: string | null
  replyToUser: string | null
  replyChain: string[]
}

// Utility types for Firebase operations
export type WithoutId<T> = Omit<T, 'id'>
export type TopicCreate = WithoutId<Topic>
export type CommentCreate = WithoutId<Comment>

// Type guards
export const isValidCategory = (category: string): category is Category => {
  return ['Transportation', 'MOW'].includes(category)
}

export const isValidMediaType = (mediaType: string): mediaType is MediaType => {
  return ['image', 'video', 'gif'].includes(mediaType)
} 