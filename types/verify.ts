export interface VerifyRequest {
  phoneNumber: string
  code?: string
}

export interface VerifyResponse {
  success: boolean
  message: string
} 