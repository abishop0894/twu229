import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Topic } from '@/lib/firebase/types'
import { TopicStore, TopicState, TopicFilter } from './types'
import { onSnapshot, query, collection, orderBy, where, DocumentSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/firebase'

type TopicAction = 
  | { type: 'SET_TOPICS'; payload: Topic[] }
  | { type: 'ADD_TOPIC'; payload: Topic }
  | { type: 'UPDATE_TOPIC'; payload: { id: string; updates: Partial<Topic> } }
  | { type: 'SET_CURRENT_TOPIC'; payload: Topic }
  | { type: 'SET_FILTER'; payload: Partial<TopicFilter> }
  | { type: 'SET_STATE'; payload: TopicState }
  | { type: 'SET_LAST_DOC'; payload: DocumentSnapshot }
  | { type: 'SET_HAS_MORE'; payload: boolean }

const initialState: TopicStore = {
  topics: [],
  filter: {
    category: 'all',
    sortBy: 'newest',
    search: ''
  },
  state: 'loading',
  lastDoc: null,
  hasMore: true
}

const TopicContext = createContext<{
  state: TopicStore
  dispatch: React.Dispatch<TopicAction>
} | null>(null)

function topicReducer(state: TopicStore, action: TopicAction): TopicStore {
  switch (action.type) {
    case 'SET_TOPICS':
      return { ...state, topics: action.payload }
    case 'ADD_TOPIC':
      return { ...state, topics: [action.payload, ...state.topics] }
    case 'UPDATE_TOPIC':
      return {
        ...state,
        topics: state.topics.map(topic =>
          topic.id === action.payload.id
            ? { ...topic, ...action.payload.updates }
            : topic
        )
      }
    case 'SET_CURRENT_TOPIC':
      return { ...state, currentTopic: action.payload }
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } }
    case 'SET_STATE':
      return { ...state, state: action.payload }
    case 'SET_LAST_DOC':
      return { ...state, lastDoc: action.payload }
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload }
    default:
      return state
  }
}

export function TopicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(topicReducer, initialState)

  useEffect(() => {
    const { category, sortBy } = state.filter
    let q = query(collection(db, 'topics'))

    if (category !== 'all') {
      q = query(q, where('category', '==', category))
    }

    q = query(q, orderBy(sortBy === 'popular' ? 'commentCount' : 'timestamp', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const topics = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Topic[]
        dispatch({ type: 'SET_TOPICS', payload: topics })
        dispatch({ type: 'SET_STATE', payload: 'success' })
      },
      (error) => {
        console.error('Error fetching topics:', error)
        dispatch({ type: 'SET_STATE', payload: 'error' })
      }
    )

    return () => unsubscribe()
  }, [state.filter.category, state.filter.sortBy])

  return (
    <TopicContext.Provider value={{ state, dispatch }}>
      {children}
    </TopicContext.Provider>
  )
}

export function useTopicStore() {
  const context = useContext(TopicContext)
  if (!context) {
    throw new Error('useTopicStore must be used within a TopicProvider')
  }
  return context
} 