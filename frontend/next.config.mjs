/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true, // Disable image optimization for static export
    },
};

export default nextConfig;