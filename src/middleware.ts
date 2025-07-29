import { NextResponse, NextRequest } from 'next/server'
 
const privatePaths = ['/manage']
const publicPaths = ['/login']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname} = request.nextUrl;
  console.log(pathname);
  const isAuth = request.cookies.get('accessToken')?.value;
  if(privatePaths.includes(pathname) && !isAuth){
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if(publicPaths.includes(pathname) && isAuth){
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/manage/:path*', '/login', '/'],
}