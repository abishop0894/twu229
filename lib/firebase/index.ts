    import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore'
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
    }

    export async function submitSurveyResponse(response: SurveyResponse) {
      const db = getFirestore(app)
      const docRef = doc(db, 'surveyResults', response.id)
      await setDoc(docRef, {
        responses: response.responses,
        timestamp: serverTimestamp()
      })
    }