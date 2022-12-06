/** @type {import('next').NextConfig} */
const env = require("./env.config");

const nextConfig = {
  ...env,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
    minimumCacheTTL: 60
  }
};

module.exports = nextConfig;
