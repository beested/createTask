import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

const publicRoutes = [
  {
    path: '/sign-in',
    whenAutenticated: 'redirect'
  }
]

const REDIRECT_NOT_AUTHENTICATED_ROUTE = '/sign-in'
const REDIRECT_IF_AUTHENTICATED = '/'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')

  if (!authToken) {
    if (publicRoute) {
      return NextResponse.next()
    }

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (publicRoute && publicRoute.whenAutenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_IF_AUTHENTICATED
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
