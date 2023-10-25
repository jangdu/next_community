/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.gravatar.com", "localhost", "ec2-52-14-81-103.us-east-2.compute.amazonaws.com"],
  },
};

module.exports = nextConfig;
