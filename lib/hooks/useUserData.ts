import { useUser } from '@clerk/nextjs'

export interface ClerkUser {
  firstName: string
  lastName: string
  imageUrl: string
  id: string
}

export const useUserData = (): ClerkUser | null => {
  const { user, isLoaded } = useUser()

  if (!isLoaded || !user) {
    return null
  }

  return {
    firstName: user.firstName ?? 'User',
    lastName: user.lastName ?? 'User',
    imageUrl: user.imageUrl,
    id: user.id
  }
} 