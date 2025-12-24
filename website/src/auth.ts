import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        // Add custom fields like simulated balance to the session
        // Note: You might need to extend the type definition for typescript
        // @ts-ignore
        session.user.balanceUSDT = user.balanceUSDT;
        // @ts-ignore
        session.user.id = user.id;
      }
      return session;
    }
  }
})
