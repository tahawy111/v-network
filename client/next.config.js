/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API: "http://localhost:5000",
  },
};

module.exports = nextConfig;
