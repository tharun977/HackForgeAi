import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/generate/:path*",
    "/api/projects/:path*",
    "/api/generate/:path*",
  ],
};