/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
    NEXT_URL: process.env.NEXT_PUBLIC_NEXT_URL || "http://localhost:3000",
  },
};

module.exports = nextConfig;
