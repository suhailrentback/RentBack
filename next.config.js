/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false, // turn off so string hrefs are fine
  },
};

module.exports = nextConfig;
