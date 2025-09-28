// middleware.ts
export { default } from "next-auth/middleware";
export const config = { matcher: ["/tenant/:path*", "/landlord/:path*", "/admin/:path*"] };
