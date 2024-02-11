/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
  async redirects() {
    return[
      {
      source: '/',
      destination: '/dashboard',
      permanent: true
    }]
  },
};

export default nextConfig;
