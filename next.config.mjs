/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'i.gr-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'books.google.com',
      },
    ],
  },
};

export default nextConfig;