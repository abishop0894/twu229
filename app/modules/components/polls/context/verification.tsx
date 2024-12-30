'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface VerificationContextType {
  verificationStatus: string
  setVerificationStatus: (status: string) => void
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined)

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [verificationStatus, setVerificationStatus] = useState<string>('pending')

  return (
    <VerificationContext.Provider value={{ verificationStatus, setVerificationStatus }}>
      {children}
    </VerificationContext.Provider>
  )
}

export function useVerification() {
  const context = useContext(VerificationContext)
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider')
  }
  return context
} 