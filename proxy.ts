import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const pathName = request.nextUrl
    console.log(pathName);
    

    
//   return NextResponse.redirect(new URL('/', request.url))
return NextResponse.next()
}
 

export const config = {
  matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
}