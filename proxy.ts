import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtUtils } from './utils/jwt'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/news']

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname

    const cookieStore = await cookies()
    const accessToken = request.cookies.get('accessToken')?.value


    const decodedToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null


    let userRole = null
    if (decodedToken?.success && decodedToken.data) {
        userRole = (decodedToken.data as JwtPayload).role 
    }

    if(!decodedToken?.success ){
        //token has expire
        cookieStore.delete('accessToken')
        return NextResponse.redirect(new URL('/login', request.url))
        
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

    const isPublic = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"))
    const isAuthRoute = AUTH_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"))
   
   //Authenticate pages protection

    if (!accessToken  && !isAuthRoute && !isPublic) {
            return NextResponse.redirect(new URL('/login', request.url))
    }

    // Authorization : role based access control
    if(pathName.startsWith('/user-dashboard') && userRole !== 'USER'){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }else if(pathName.startsWith('/admin-dashboard') && userRole !== 'ADMIN'){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }else if(pathName.startsWith('/author-dashboard') && userRole !== 'AUTHOR'){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }


    return NextResponse.next()
}


export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
}