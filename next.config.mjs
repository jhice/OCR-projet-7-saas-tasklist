/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    // active forbidden() / forbidden.js (page 403)
    authInterrupts: true,
  },
};

export default nextConfig;
