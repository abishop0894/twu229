    import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore'
    import { app } from './firebase'

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

    export interface Comment {
      id: string
      text: string
      userEmail: string
      userAvatar: string
      userName: string
      timestamp: string
      likes: number
      likedBy: string[]
    }

    export const addComment = async (comment: Omit<Comment, 'id'>) => {
      const db = getFirestore(app)
      const commentsCollection = collection(db, 'comments')
      const newCommentRef = doc(commentsCollection)
      
      await setDoc(newCommentRef, {
        ...comment,
        id: newCommentRef.id,
        timestamp: serverTimestamp()
      })
    }

    export const getComments = async (): Promise<Comment[]> => {
      const db = getFirestore(app)
      const commentsCollection = collection(db, 'comments')
      const commentSnapshot = await getDocs(commentsCollection)
      
      return commentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[]
    }

    export const updateCommentLikes = async (commentId: string, userEmail: string) => {
      const db = getFirestore(app)
      const commentRef = doc(db, 'comments', commentId)
      const commentDoc = await getDoc(commentRef)
      
      if (!commentDoc.exists()) return
      
      const comment = commentDoc.data() as Comment
      const isLiked = comment.likedBy.includes(userEmail)
      
      await updateDoc(commentRef, {
        likes: isLiked ? comment.likes - 1 : comment.likes + 1,
        likedBy: isLiked 
          ? comment.likedBy.filter(email => email !== userEmail)
          : [...comment.likedBy, userEmail]
      })
    }