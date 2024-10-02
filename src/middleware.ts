import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  ) {
    const dashboardUrl = new URL('/dashboard', request.url);

    if (token) {
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url);

    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: '/dashboard/:path*',
// };
