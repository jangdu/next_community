/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'www.gravatar.com',
      'res.cloudinary.com',
      'localhost',
      'ec2-52-14-81-103.us-east-2.compute.amazonaws.com',
      'community.jangdu.co.kr',
    ],
  },
};

// next-remove-imports configuration
const removeImports = require('next-remove-imports')();

module.exports = {
  ...nextConfig, // Merge 'nextConfig' object
  ...removeImports({}), // Merge 'removeImports' object
};
