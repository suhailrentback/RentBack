// middleware.ts
export { auth as middleware } from "./app/api/auth/[...nextauth]/route";

export const config = {
  matcher: ["/tenant/:path*", "/landlord/:path*", "/admin/:path*"],
};
