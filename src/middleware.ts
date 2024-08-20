import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // check is public path
    const isPublicPath = path === '/login' || path === '/signup';
    
    const token = request.cookies.get('token')?.value || '';
    
    // if user has loged in so dont need to be redicret on public path
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // if user are not using public path and they are not login, Obviously it need to redirect on login
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))

    }  
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*'

  ]
}