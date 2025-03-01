import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define only the protected routes that need authentication
const isProtectedRoute = createRouteMatcher([
  '/localtalk(.*)', 
  '/members/survey(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  // Only check authentication on the protected routes
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Only run middleware on the specific protected routes
    '/localtalk(.*)',
    '/members/survey(.*)',
    // And API routes
    '/api/((?!webhook).*)'
  ],
}