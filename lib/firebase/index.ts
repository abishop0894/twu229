    import { getFirestore, collection, getDocs } from 'firebase/firestore'
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

