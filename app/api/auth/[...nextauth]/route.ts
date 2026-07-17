import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          // Fallback: If no users exist at all in DB, create the first admin user
          const userCount = await prisma.user.count()
          if (userCount === 0 && credentials.email === "admin@hengkyytrip.com") {
            const hashedPassword = await bcrypt.hash(credentials.password, 10)
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: "Super Admin",
                password: hashedPassword,
                role: "super-admin"
              }
            })
          } else {
            return null
          }
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && session.user.email) {
        // Force refresh from DB so changes apply immediately
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email }
        })
        
        if (dbUser) {
          (session.user as any).role = dbUser.role
          session.user.name = dbUser.name
        } else {
          (session.user as any).role = token.role
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
