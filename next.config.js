/** @type {import('next').NextConfig} */
const env = require("./env.config");

const nextConfig = {
  ...env,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org", "png.pngtree.com"],
    minimumCacheTTL: 60
  }
};

module.exports = nextConfig;
