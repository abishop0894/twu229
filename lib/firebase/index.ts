import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp} from 'firebase/firestore'
import { app } from './firebase'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export interface Event {
  body: string
  date: string
  images: string[]
  title: string
  highlight: boolean
  location: string
}

export interface Article {
  date: string
  image: string
  title: string
  source: string
  paragraphOne: string
  paragraphTwo?: string
  paragraphThree?: string
}

export async function getEvents(): Promise<Event[]> {
  const db = getFirestore(app)
  const eventsCollection = collection(db, 'events')
  const eventSnapshot = await getDocs(eventsCollection)
  
  const events = eventSnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      body: data.body ?? '',
      date: data.date ?? '',
      images: data.images ?? [],
      title: data.title ?? '',
      location: data.location ?? '',
      highlight: data.highlight ?? false
    }
  })

  return events
}

export async function getArticles(): Promise<Article[]> {
  const db = getFirestore(app)
  const articlesCollection = collection(db, 'articles')
  const articleSnapshot = await getDocs(articlesCollection)
  
  const articles = articleSnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      date: data.date ?? '',
      source: data.source ?? '',
      title: data.title ?? '',
      image: data.image ?? '',
      paragraphOne: data.paragraphOne ?? '',
      paragraphTwo: data.paragraphTwo ?? '',
      paragraphThree: data.paragraphThree ?? '',
    }
  })

  return articles
}

export interface MemberHighlight {
  firstName: string
  lastName: string
  years: number
  image: string
  questionOne: string
  questionTwo: string
  questionThree: string
  questionFour: string
  answerOne: string
  answerTwo: string
  answerThree: string
  answerFour: string
}

export async function getMemberHighlight(): Promise<MemberHighlight> {
  const db = getFirestore(app)
  const memberHighlightCollection = collection(db, 'memberHighlight')
  const memberSnapshot = await getDocs(memberHighlightCollection)
  
  const member = memberSnapshot.docs[0].data() as MemberHighlight
  return member
}

export type Survey = {
  dateEnding: Date
  question: string[],
  answerChoices: { [key: string]: string }[] // or Record<string, string>[] to be more specific
}

export async function getSurvey(): Promise<Survey> {
  const db = getFirestore(app)
  const surveyCollection = collection(db, 'survey')
  const surveySnapshot = await getDocs(surveyCollection)
  const survey = surveySnapshot.docs[0].data() as Survey
  return survey
}

interface SurveyResponse {
  id: string
  responses: Record<number, string>
  email: string | undefined
}

export async function submitSurveyResponse(response: SurveyResponse) {
  const db = getFirestore(app)
  const docRef = doc(db, 'surveyResults', response.id)
  await setDoc(docRef, {
    responses: response.responses,
    email: response.email,
    timestamp: serverTimestamp()
  })
}

// export interface Comment {
//   id: string
//   content: string
//   authorId: string
//   authorName: string
//   authorImage: string
//   createdAt: string
//   replyTo?: string
//   replyCount?: number
// }

// export interface CommentWithReplies extends Omit<Comment, 'replyCount'> {
//   replies?: CommentWithReplies[]
//   isCollapsed?: boolean
// }

// export interface PollComment {
//   id: string
//   text: string
//   userEmail: string
//   userAvatar: string
//   userName: string
//   timestamp: string
//   likes: number
//   likedBy: string[]
// }

// export const addComment = async (comment: Omit<PollComment, 'id'>) => {
//   const db = getFirestore(app)
//   const commentsCollection = collection(db, 'comments')
//   const newCommentRef = doc(commentsCollection)
  
//   await setDoc(newCommentRef, {
//     ...comment,
//     id: newCommentRef.id,
//     timestamp: serverTimestamp()
//   })
// }

// export const getComments = async (): Promise<Comment[]> => {
//   const db = getFirestore(app)
//   const commentsCollection = collection(db, 'comments')
//   const commentSnapshot = await getDocs(commentsCollection)
  
//   return commentSnapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   })) as Comment[]
// }

// export const updateCommentLikes = async (commentId: string, userEmail: string) => {
//   const db = getFirestore(app)
//   const commentRef = doc(db, 'comments', commentId)
//   const commentDoc = await getDoc(commentRef)
  
//   if (!commentDoc.exists()) return
  
//   const comment = commentDoc.data() as PollComment
//   const isLiked = comment.likedBy.includes(userEmail)
  
//   await updateDoc(commentRef, {
//     likes: isLiked ? comment.likes - 1 : comment.likes + 1,
//     likedBy: isLiked 
//       ? comment.likedBy.filter(email => email !== userEmail)
//       : [...comment.likedBy, userEmail]
//   })
// }

// // Types
// export interface Topic {
//   id: string
//   content: string
//   authorId: string
//   authorName: string
//   authorImage: string
//   department: 'MOW' | 'Transportation' | 'General'
//   mediaUrl?: string
//   mediaType?: 'image' | 'video' | 'gif' | null
//   createdAt: string
//   commentCount: number
// }

// export interface Comment {
//   id: string
//   topicId: string
//   content: string
//   authorId: string
//   authorName: string
//   authorImage: string
//   createdAt: string
//   replyTo?: string
//   replyCount?: number
// }

// // Upload media file to Firebase Storage
// export const uploadMedia = async (file: File, path: string): Promise<string> => {
//   const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
//   await uploadBytes(storageRef, file)
//   return getDownloadURL(storageRef)
// }

// // Add a new topic
// export const addTopic = async (topicData: Omit<Topic, 'id'>) => {
//   const db = getFirestore(app)
//   const docRef = await addDoc(collection(db, 'topics'), {
//     ...topicData,
//     createdAt: serverTimestamp(),
//     commentCount: 0
//   })
//   return docRef.id
// }

// // Get topics with pagination and filtering
// export const getTopics = async ({
//   lastDoc,
//   limitCount = 10,
//   department = null
// }: {
//   lastDoc?: DocumentSnapshot
//   limitCount?: number
//   department?: 'MOW' | 'Transportation' | 'General' | null
// }) => {
//   const db = getFirestore(app)
//   let q = query(
//     collection(db, 'topics'),
//     orderBy('createdAt', 'desc')
//   )

//   if (department) {
//     q = query(q, where('department', '==', department))
//   }

//   q = query(q, limit(limitCount))
  
//   if (lastDoc) {
//     q = query(q, startAfter(lastDoc))
//   }

//   const snapshot = await getDocs(q)
//   const topics = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//     createdAt: (doc.data().createdAt as Timestamp).toDate().toISOString()
//   })) as Topic[]

//   return {
//     topics,
//     lastVisible: snapshot.docs[snapshot.docs.length - 1]
//   }
// }

// // Get a single topic
// export const getTopic = async (topicId: string): Promise<Topic | null> => {
//   const db = getFirestore(app)
//   const docRef = doc(db, 'topics', topicId)
//   const docSnap = await getDoc(docRef)

//   if (!docSnap.exists()) return null

//   const data = docSnap.data()
//   return {
//     id: docSnap.id,
//     ...data,
//     createdAt: data.createdAt.toDate().toISOString()
//   } as Topic
// }

// // Add a comment to a topic
// export const addTopicComment = async (commentData: {
//   topicId: string
//   content: string
//   authorId: string
//   authorName: string
//   authorImage: string
//   replyTo?: string
// }) => {
//   const db = getFirestore(app)
//   const commentDoc = {
//     ...commentData,
//     createdAt: serverTimestamp(),
//     replyCount: 0,
//     replyTo: commentData.replyTo || null  // Set to null if undefined
//   }

//   const docRef = await addDoc(collection(db, 'comments'), commentDoc)

//   // Update comment count on topic
//   await updateDoc(doc(db, 'topics', commentData.topicId), {
//     commentCount: increment(1)
//   })

//   // If this is a reply, update the parent comment's reply count
//   if (commentData.replyTo) {
//     await updateDoc(doc(db, 'comments', commentData.replyTo), {
//       replyCount: increment(1)
//     })
//   }

//   return docRef.id
// }

// // Get comments for a topic
// export const getTopicComments = async ({
//   topicId,
//   lastDoc,
//   limit: limitCount = 20,
//   replyTo = null
// }: {
//   topicId: string
//   lastDoc?: DocumentSnapshot
//   limit?: number
//   replyTo?: string | null
// }) => {
//   const db = getFirestore(app)
//   let q = query(
//     collection(db, 'comments'),
//     where('topicId', '==', topicId),
//     orderBy('createdAt', 'desc'),
//     limit(limitCount)
//   )

//   if (replyTo !== null) {
//     q = query(q, where('replyTo', '==', replyTo || null))
//   }

//   if (lastDoc) {
//     q = query(q, startAfter(lastDoc))
//   }

//   const snapshot = await getDocs(q)
//   const comments = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//     createdAt: (doc.data().createdAt as Timestamp).toDate().toISOString()
//   })) as Comment[]

//   return {
//     comments,
//     lastVisible: snapshot.docs[snapshot.docs.length - 1]
//   }
// }

// // Get a single comment
// export const getComment = async (commentId: string): Promise<Comment | null> => {
//   const db = getFirestore(app)
//   const docRef = doc(db, 'comments', commentId)
//   const docSnap = await getDoc(docRef)

//   if (!docSnap.exists()) return null

//   const data = docSnap.data()
//   return {
//     id: docSnap.id,
//     ...data,
//     createdAt: (data.createdAt as Timestamp).toDate().toISOString()
//   } as Comment
// }