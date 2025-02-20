import { addDoc, getDoc, updateDoc,  doc, increment, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'
import { topicsCollection, commentsCollection } from './schema'
import { Topic, Comment, TopicCreate, CommentCreate } from './types'
import { query, where, orderBy, startAfter, limit, getDocs } from 'firebase/firestore'
import { DocumentSnapshot } from 'firebase/firestore'
import { Category } from './types'
import { getFirestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { app } from './firebase'
import { writeBatch } from 'firebase/firestore'

export const createTopic = async (topic: TopicCreate): Promise<string> => {
  const docRef = await addDoc(topicsCollection, topic)
  return docRef.id
}

export const createComment = async (comment: CommentCreate): Promise<string> => {
  const docRef = await addDoc(commentsCollection, comment)
  // Update topic comment count
  await updateDoc(doc(db, 'topics', comment.topicId), {
    commentCount: increment(1)
  })
  return docRef.id
}

export const getTopic = async (id: string): Promise<Topic | null> => {
  const docRef = doc(topicsCollection, id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...(docSnap.data() as Omit<Topic, 'id'>) } : null
}

export const getComment = async (id: string): Promise<Comment | null> => {
  const docRef = doc(commentsCollection, id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...(docSnap.data() as Omit<Comment, 'id'>) } : null
}

export const getTopics = async ({
  lastDoc,
  limitCount = 10,
  category = null,
  sortBy = 'newest'
}: {
  lastDoc?: DocumentSnapshot
  limitCount?: number
  category?: Category | null
  sortBy?: 'newest' | 'oldest' | 'popular'
}) => {
  const db = getFirestore(app)
  let q = query(collection(db, 'topics'))

  if (category) {
    q = query(q, where('category', '==', category))
  }

  switch (sortBy) {
    case 'newest':
      q = query(q, orderBy('timestamp', 'desc'))
      break
    case 'oldest':
      q = query(q, orderBy('timestamp', 'asc'))
      break
    case 'popular':
      q = query(q, orderBy('commentCount', 'desc'))
      break
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  q = query(q, limit(limitCount))

  const snapshot = await getDocs(q)
  return {
    topics: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Topic)),
    lastVisible: snapshot.docs[snapshot.docs.length - 1]
  }
}

export const deleteTopic = async (topicId: string, userId: string) => {
  const topic = await getTopic(topicId)
  if (!topic || topic.userId !== userId) {
    throw new Error('Unauthorized')
  }
  
  // Create a batch
  const batch = writeBatch(db)
  
  // Delete all comments for this topic first
  const commentsQuery = query(collection(db, 'comments'), where('topicId', '==', topicId))
  const commentsSnapshot = await getDocs(commentsQuery)
  commentsSnapshot.docs.forEach(doc => batch.delete(doc.ref))
  
  // Delete the topic
  batch.delete(doc(db, 'topics', topicId))
  await batch.commit()
}

export const deleteComment = async (commentId: string, userId: string) => {
  const comment = await getComment(commentId)
  if (!comment || comment.userId !== userId) {
    throw new Error('Unauthorized')
  }
  
  const db = getFirestore(app)
  // Delete the comment
  await deleteDoc(doc(db, 'comments', commentId))
  // Decrement topic comment count
  await updateDoc(doc(db, 'topics', comment.topicId), {
    commentCount: increment(-1)
  })
} 