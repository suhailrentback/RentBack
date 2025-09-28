// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Demo users — no database needed
const users = [
  { id: "u_tenant", email: "tenant@rentback.app", password: "tenant", role: "TENANT" },
  { id: "u_landlord", email: "landlord@rentback.app", password: "landlord", role: "LANDLORD" },
  { id: "u_admin", email: "admin@rentback.app", password: "admin", role: "ADMIN" },
] as const;

const credSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "Demo Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) return null;
        return { id: user.id, email: user.email, name: user.email.split("@")[0], role: user.role } as any;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) (token as any).role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role ?? "TENANT";
      return session;
    },
  },
  pages: { signIn: "/sign-in" },
});
