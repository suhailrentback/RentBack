// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const role = req.cookies.get("rb-role")?.value;

  const isApp = url.pathname.startsWith("/tenant") || url.pathname.startsWith("/landlord") || url.pathname.startsWith("/admin");
  if (!isApp) return NextResponse.next();

  if (!role) {
    const signIn = new URL("/sign-in", req.url);
    signIn.searchParams.set("next", url.pathname);
    return NextResponse.redirect(signIn);
  }
  // simple role path check
  if (url.pathname.startsWith("/tenant") && role !== "TENANT") return NextResponse.redirect(new URL("/sign-in", req.url));
  if (url.pathname.startsWith("/landlord") && role !== "LANDLORD") return NextResponse.redirect(new URL("/sign-in", req.url));
  if (url.pathname.startsWith("/admin") && role !== "ADMIN") return NextResponse.redirect(new URL("/sign-in", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/tenant/:path*", "/landlord/:path*", "/admin/:path*"],
};
