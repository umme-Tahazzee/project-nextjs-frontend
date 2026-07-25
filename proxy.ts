import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'

const AUTH_ROUTES = ['/login', '/register']
export function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const accessToken = request.cookies.get('accessToken')?.value
    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null
    // console.log(accessToken, "accessToken");

    let userRole = null
    if (decodedToken) {
        userRole = decodedToken.role
    }
    
    //user is login 
    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        if (userRole === 'USER') {
            return NextResponse.redirect(new URL('/user-dashboard', request.url))
        } else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        } else if (userRole === 'AUTHOR') {
            return NextResponse.redirect(new URL('/author-dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}


export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
}