import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const credsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Demo",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = credsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) return null; // DEMO ONLY
        return { id: user.id, name: user.name ?? "", email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
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
});

export { handler as GET, handler as POST };
