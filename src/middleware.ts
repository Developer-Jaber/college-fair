import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if(pathname.startsWith('/_next/') ||
       pathname.startsWith('/api/auth/') ||
       pathname.startsWith('/favicon.ico') ||
       pathname.startsWith('/logo/') ||
       pathname.includes('.')) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production'
    })


    // list of protects route 
    const protectedRoutes = [
        '/admin',
        '/student',
        '/faculty',
        '/dashboard',
        '/profile',
        '/my-college',
    ]

    // auth routes that should rdirect if logged in
    const authRoutes = ['/signin', '/register']

    // Role-based route access control
    // const roleRoutes = {
    //     admin: ['/admin'],
    //     student: ['/student'],
    //     faculty: ['/faculty'],
    //     staff: ['/staff']
    // };

    // 1. redirect unauthenticated users from protected route
    if(!token && protectedRoutes.some(route =>pathname.startsWith(route))) {
        const loginUrl = new URL('/signin', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

   // 2. Redirect authenticated users from auth routes to their dashboard
    if (token && authRoutes.includes(pathname)) {
        const userRole = token.role as string;
        let dashboardRoute = '/'; // default fallback
        
        switch(userRole?.toLowerCase()) {
            case 'admin':
                dashboardRoute = '/admin';
                break;
            case 'student':
                dashboardRoute = '/student';
                break;
            case 'faculty':
                dashboardRoute = '/faculty';
                break;
            default:
                dashboardRoute = '/';
        }
        
        return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }

    // 3. Role-based access control for dashboard routes
    if (token && pathname.startsWith('/admin') && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (token && pathname.startsWith('/student') && token.role !== 'student') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (token && pathname.startsWith('/faculty') && token.role !== 'faculty') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }



    return NextResponse.next()
}


// Match all routes except static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}