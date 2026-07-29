import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtUtils } from './utils/jwt'
import { getNewAccessToken } from './services/refreshToken'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/news', '/premium', '/payment']

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const cookieStore = await cookies()

    let accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value
    const decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
    const decodeRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null
    console.log(decodedAccessToken);
    
    if (!decodedAccessToken?.success && decodeRefreshToken?.success) {

        const result = await getNewAccessToken()
        if (result.success) {
            const newAccessToken = result.data.accessToken
            cookieStore.set('accessToken', newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'lax'
            })
            accessToken = newAccessToken
        }
    }

    let userRole = null
    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role
    }

    const isPublic = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"))
    const isAuthRoute = AUTH_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"))

    // user is logged in and trying to visit /login or /register -> send to their dashboard
    if (accessToken && decodedAccessToken?.success && isAuthRoute) {
        if (userRole === 'USER') return NextResponse.redirect(new URL('/user-dashboard', request.url))
        if (userRole === 'ADMIN') return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        if (userRole === 'AUTHOR') return NextResponse.redirect(new URL('/author-dashboard', request.url))
        return NextResponse.redirect(new URL('/', request.url))
    }

    // no valid token -> only block protected (non-public, non-auth) routes
    if (!decodedAccessToken?.success && !isAuthRoute && !isPublic) {
        cookieStore.delete('accessToken')
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // if(userRole === 'USER' && )
    // Authorization : role based access control
    if (pathName.startsWith('/user-dashboard') && userRole !== 'USER') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    } else if (pathName.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    } else if (pathName.startsWith('/author-dashboard') && userRole !== 'AUTHOR') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
}