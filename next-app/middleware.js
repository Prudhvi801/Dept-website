import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Only protect admin routes
  if (path.startsWith('/admin')) {
    // Get the token from the cookies
    const token = request.cookies.get('admin-token')?.value || '';
    
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Match only admin paths
export const config = {
  matcher: ['/admin/:path*'],
};