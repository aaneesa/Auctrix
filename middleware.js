import { NextResponse } from 'next/server';
const publicPaths = ['/auth', '/api/auth'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  const token = request.cookies.get('auth_token')?.value;
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api/auth|_next|fonts|images|[\\w-]+\\.(?:png|jpg|jpeg|gif|svg)$).*)',
  ],
}; 