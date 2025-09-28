// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // You would put other config options here if you had any
};

module.exports = {
  ...nextConfig, // Include your base config
  async rewrites() {
    return [
      {
        source: '/call-details',
        destination: 'http://127.0.0.1:5000/call-details',
      },
      {
        source: '/call-details/:path*',
        destination: 'http://127.0.0.1:5000/call-details/:path*',
      },
    ]
  },
}