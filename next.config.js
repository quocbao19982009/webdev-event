/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
    NEXT_URL: process.env.NEXT_PUBLIC_NEXT_URL || "http://localhost:3000",
    MAPBOX_API_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN ||
      "pk.eyJ1IjoicXVvY2JhbzE5OTgyMDA5IiwiYSI6ImNreXNiOWZxdjExd24yeG81cDUxeWFmbjMifQ.1fL3FBADi2thAykZtbhPOA",
    GOOGLE_MAP_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ||
      "AIzaSyBJcmOebVT4BA2oyI0hB2E4UEijTNMRijg",
  },
};

module.exports = nextConfig;
