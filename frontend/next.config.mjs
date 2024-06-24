/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;