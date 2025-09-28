import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const users = [
  { id: "1", name: "Tenant",   email: "tenant@rentback.app",   role: "TENANT",   password: "demo" },
  { id: "2", name: "Landlord", email: "landlord@rentback.app", role: "LANDLORD", password: "demo" },
  { id: "3", name: "Admin",    email: "admin@rentback.app",    role: "ADMIN",    password: "demo" },
] as const;

export const authOptions = {
  session: { strategy: "jwt" as const },
  providers: [
    Credentials({
      name: "Demo",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const u = users.find(
          x => x.email === credentials?.email && x.password === credentials?.password
        );
        return u ? { id: u.id, name: u.name, email: u.email, role: u.role } : null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) token.role = (user as any).role; return token; },
    async session({ session, token }) { (session as any).role = token.role; return session; },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
