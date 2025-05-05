/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['zenn-markdown-html', 'zenn-content-css'],
  images: {
    domains: ['images.microcms-assets.io'],
  },
};

export default nextConfig; 