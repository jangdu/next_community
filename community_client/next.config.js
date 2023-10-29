/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'www.gravatar.com',
      'localhost',
      'ec2-52-14-81-103.us-east-2.compute.amazonaws.com',
      'community.jangdu.co.kr',
    ],
  },
};

module.exports = nextConfig;
