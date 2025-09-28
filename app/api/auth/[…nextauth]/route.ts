// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// Demo users. Change passwords in Vercel ENV if you want.
const DEMO_USERS = [
  { email: "tenant@rentback.app",    password: process.env.DEMO_TENANT_PASS    ?? "tenant123",    role: "TENANT"   },
  { email: "landlord@rentback.app",  password: process.env.DEMO_LANDLORD_PASS  ?? "landlord123",  role: "LANDLORD" },
  { email: "admin@rentback.app",     password: process.env.DEMO_ADMIN_PASS     ?? "admin123",     role: "ADMIN"    },
] as const;

const Creds = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = Creds.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const found = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (!found) return null;

        return {
          id: found.email,
          email: found.email,
          name: found.role,
          role: found.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      (session as any).role = token.role;
      return session;
    },
  },
  pages: { signIn: "/sign-in" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
