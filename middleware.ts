import { withClerkMiddleware } from '@clerk/nextjs';

export default withClerkMiddleware({
  publicRoutes: ["/", "/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
