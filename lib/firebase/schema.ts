import { collection, query, orderBy, where, limit, CollectionReference } from 'firebase/firestore'
import { db } from './firebase'
import { Topic, Comment } from './types'

// Collection references with types
export const topicsCollection = collection(db, 'topics') as CollectionReference<Topic>
export const commentsCollection = collection(db, 'comments') as CollectionReference<Comment>

// Query builders
export const getTopicsByTimestamp = (limitCount: number = 20) => 
  query(topicsCollection, 
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  )

export const getTopicsByCategory = (category: Topic['category'], limitCount: number = 20) =>
  query(topicsCollection,
    where('category', '==', category),
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  )

export const getCommentsByTopic = (topicId: string) =>
  query(commentsCollection,
    where('topicId', '==', topicId),
    orderBy('timestamp', 'asc')
  )

export const getCommentReplies = (parentCommentId: string) =>
  query(commentsCollection,
    where('parentCommentId', '==', parentCommentId),
    orderBy('timestamp', 'asc')
  ) 