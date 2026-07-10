import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Temporarily bypass auth
    },
    pages: {
      signIn: "/login",
    },
  }
)

