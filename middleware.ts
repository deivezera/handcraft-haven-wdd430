import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access the dashboard
  if (pathname.startsWith('/dashboard')) {
    const artisanId = request.cookies.get('artisan-id');
    
    // If no artisan ID cookie, redirect to login
    if (!artisanId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // If user is on login/register page and already has artisan ID, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register')) {
    const artisanId = request.cookies.get('artisan-id');
    
    if (artisanId) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
};
