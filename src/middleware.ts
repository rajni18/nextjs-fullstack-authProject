import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/signUp' || path === '/login' || path === 'verifyEmail'
    const token = request.cookies.get("token")?.value ;

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/Profile', request.url))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signUp',
    '/login',
    '/verifyEmail',
    '/Profile'
  ],
}