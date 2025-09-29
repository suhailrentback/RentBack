// middleware.ts
import { NextResponse, NextRequest } from "next/server";

const ZONES = ["/tenant", "/landlord", "/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard our app zones
  if (!ZONES.some((z) => pathname.startsWith(z))) {
    return NextResponse.next();
  }

  const role = req.cookies.get("rb-role")?.value; // "TENANT" | "LANDLORD" | "ADMIN" | undefined

  // If no role cookie, send to sign-in and remember where they were going
  if (!role) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Optional strict zone guarding (keeps roles in their area)
  if (pathname.startsWith("/tenant") && role !== "TENANT") {
    return NextResponse.redirect(new URL("/sign-in?next=/tenant", req.url));
  }
  if (pathname.startsWith("/landlord") && role !== "LANDLORD") {
    return NextResponse.redirect(new URL("/sign-in?next=/landlord", req.url));
  }
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/sign-in?next=/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tenant/:path*", "/landlord/:path*", "/admin/:path*"],
};
