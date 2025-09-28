// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// IMPORTANT: only export HTTP methods here.
// Do NOT export authOptions or any other names from a route file.
export { handler as GET, handler as POST };
