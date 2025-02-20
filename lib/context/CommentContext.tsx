import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Comment } from '@/lib/firebase/types'
import { CommentStore, CommentState } from './types'
import { onSnapshot, query, collection, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase/firebase'

type CommentAction =
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'UPDATE_COMMENT'; payload: { id: string; updates: Partial<Comment> } }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'SET_REPLY_TO'; payload: string | undefined }
  | { type: 'SET_STATE'; payload: CommentState }

const initialState: CommentStore = {
  comments: [],
  state: 'submitting',
  replyTo: undefined
}

const CommentContext = createContext<{
  state: CommentStore
  dispatch: React.Dispatch<CommentAction>
} | null>(null)

function commentReducer(state: CommentStore, action: CommentAction): CommentStore {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload }
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] }
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id
            ? { ...comment, ...action.payload.updates }
            : comment
        )
      }
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload)
      }
    case 'SET_REPLY_TO':
      return { ...state, replyTo: action.payload }
    case 'SET_STATE':
      return { ...state, state: action.payload }
    default:
      return state
  }
}

export function CommentProvider({ children, topicId }: { children: ReactNode; topicId: string }) {
  const [state, dispatch] = useReducer(commentReducer, initialState)

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('topicId', '==', topicId),
      orderBy('timestamp', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const comments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Comment[]
        dispatch({ type: 'SET_COMMENTS', payload: comments })
        dispatch({ type: 'SET_STATE', payload: 'success' })
      },
      (error) => {
        console.error('Error fetching comments:', error)
        dispatch({ type: 'SET_STATE', payload: 'error' })
      }
    )

    return () => unsubscribe()
  }, [topicId])

  return (
    <CommentContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentContext.Provider>
  )
}

export function useCommentStore() {
  const context = useContext(CommentContext)
  if (!context) {
    throw new Error('useCommentStore must be used within a CommentProvider')
  }
  return context
} 