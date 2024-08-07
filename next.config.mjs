/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: '/',
        destination: '/accounts-list',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['frontend-test-api.yoldi.agency'],
  },
};

export default nextConfig;
