import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const isAuthPath = request.nextUrl.pathname.startsWith('/login')

  if (isAuthPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next({
    request,
  })
}
