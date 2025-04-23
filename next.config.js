// next.config.js
module.exports = {
  env: {
    CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API,
    CLERK_API_KEY: process.env.CLERK_API_KEY,
  },
  // Other configurations...
  images: {
    domains: ['images.pexels.com'],
  },
};
