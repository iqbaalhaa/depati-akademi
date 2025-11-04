/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // TypeScript errors will fail the build. We keep it strict now.
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    qualities: [75, 97],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
