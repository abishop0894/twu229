import { Topic, Comment } from '@/lib/firebase/types'
import { DocumentSnapshot } from 'firebase/firestore'
export type TopicState = 'loading' | 'error' | 'success'
export type CommentState = 'submitting' | 'error' | 'success'

export interface TopicFilter {
  category: 'discussion' | 'question' | 'announcement' | 'event' | 'all'
  sortBy: 'newest' | 'oldest' | 'popular'
  search: string
}

export interface TopicStore {
  topics: Topic[]
  currentTopic?: Topic
  filter: TopicFilter
  state: TopicState
  lastDoc: DocumentSnapshot | null
  hasMore: boolean
}

export interface CommentStore {
  comments: Comment[]
  replyTo?: string
  state: CommentState
} 