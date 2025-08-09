import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function middleware(request: NextRequest) {
    const token = await getToken({req: request})
    const {pathname} = request.nextUrl


    // list of protects route 
    const protectedRoutes = [
        '/dashboard',
        '/profile',
        '/my-college',
    ]

    // auth routes that should rdirect if logged in
    const authRoutes = ['/signin', '/register']

    // 1. redirect unauthenticated users from protected route
    if(!token && protectedRoutes.some(route =>pathname.startsWith(route))) {
        const loginUrl = new URL('/signin', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // 2. redirect authenticated users from auth routes
    if(token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/my-college', request.url))
    }

    return NextResponse.next()
}


// Match all routes except static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}