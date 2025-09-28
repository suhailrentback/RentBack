import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Protect app sections
  const protectedPrefixes = ['/tenant','/landlord','/admin'];
  if (!protectedPrefixes.some(p => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const url = new URL('/sign-in', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  const role = token.role as 'TENANT'|'LANDLORD'|'ADMIN'|undefined;

  if (pathname.startsWith('/tenant') && role !== 'TENANT' && role !== 'ADMIN')
    return NextResponse.redirect(new URL('/sign-in', req.url));

  if (pathname.startsWith('/landlord') && role !== 'LANDLORD' && role !== 'ADMIN')
    return NextResponse.redirect(new URL('/sign-in', req.url));

  if (pathname.startsWith('/admin') && role !== 'ADMIN')
    return NextResponse.redirect(new URL('/sign-in', req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/tenant/:path*','/landlord/:path*','/admin/:path*'],
};
