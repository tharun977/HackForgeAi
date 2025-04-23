import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // Public routes that don't require authentication
    const publicPaths = ["/", "/auth/signin"]
    const path = req.nextUrl.pathname

    if (publicPaths.includes(path)) {
      return NextResponse.next()
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  },
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
