/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    //API_URL: 'http://127.0.0.1:3333',
    API_URL: 'https://backend.featherhost.com.br',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
