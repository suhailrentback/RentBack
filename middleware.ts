// middleware.ts (fallback)
export { default as middleware } from "next-auth/middleware";

export const config = {
  matcher: ["/tenant/:path*", "/landlord/:path*", "/admin/:path*"],
};
