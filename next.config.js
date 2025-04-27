/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // This is needed to make Next.js properly resolve the Convex generated files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/convex': `${__dirname}/convex`,
    };
    
    return config;
  },
};

module.exports = nextConfig;
