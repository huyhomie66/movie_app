require("dotenv").config();

const nextConfig = {
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
    BIG_IMAGE_URL: process.env.BIG_IMAGE_URL,
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY
  }
};

module.exports = nextConfig;
