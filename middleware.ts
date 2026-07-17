import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Require valid token to access dashboard
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development"
  }
)

export const config = {
  matcher: ['/dashboard/:path*']
}
