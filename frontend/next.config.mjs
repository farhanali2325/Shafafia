/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://inhouse:8089/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;