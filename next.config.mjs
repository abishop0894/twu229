/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    domains: ['img.clerk.com', 'local229.s3.us-east-1.amazonaws.com', 'localtalk.s3.us-east-1.amazonaws.com'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'local229.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localtalk.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],

  },
};

export default nextConfig;
