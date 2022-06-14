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
      "pk.eyJ1IjoicXVvY2JhbzE5OTgyMDA5IiwiYSI6ImNsNGRzMnJrdzBiOWUzbW1tcmNpc2w3aGMifQ.rXs8Tk0D_v0tK2xrlhgkRA",
    GOOGLE_MAP_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ||
      "AIzaSyC28b-7t5D5coaLll4Y3DjUiTrQWO6tD3k",
  },
};

module.exports = nextConfig;
