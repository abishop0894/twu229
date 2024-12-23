import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/polls/survey') {
    const isAuthorized = request.cookies.get('surveyAuthorized')
    if (!isAuthorized) {
      return NextResponse.redirect(new URL('/polls', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/polls/survey',
} 