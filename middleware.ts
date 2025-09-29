// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Protect app sections
  const needsAuth = path.startsWith("/tenant") || path.startsWith("/landlord") || path.startsWith("/admin");
  if (!needsAuth) return NextResponse.next();

  const role = req.cookies.get("rb-role")?.value as 'TENANT'|'LANDLORD'|'ADMIN'|undefined;
  if (!role) {
    const dest = new URL("/sign-in", req.url);
    dest.searchParams.set("next", path);
    return NextResponse.redirect(dest);
  }

  // Optional: role-specific walls (tenant pages expect TENANT, etc.)
  if (path.startsWith("/tenant") && role !== "TENANT") {
    const dest = new URL("/sign-in", req.url);
    dest.searchParams.set("next", path);
    return NextResponse.redirect(dest);
  }
  if (path.startsWith("/landlord") && role !== "LANDLORD") {
    const dest = new URL("/sign-in", req.url);
    dest.searchParams.set("next", path);
    return NextResponse.redirect(dest);
  }
  if (path.startsWith("/admin") && role !== "ADMIN") {
    const dest = new URL("/sign-in", req.url);
    dest.searchParams.set("next", path);
    return NextResponse.redirect(dest);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tenant/:path*", "/landlord/:path*", "/admin/:path*"],
};
