/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['26.78.22.26'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/avatars/**',
      },
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        pathname: '/igdb/image/upload/**',
      },
    ],
  },
}

export default nextConfig
