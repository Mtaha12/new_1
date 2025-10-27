/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  compress: true,
  
  // Image optimization
  images: {
    unoptimized: true,
    domains: [],
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  
  // ESLint and TypeScript ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // REMOVED: output: 'export' - This was causing the API route error
  trailingSlash: false,
  
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  productionBrowserSourceMaps: false,
  
  // Disable strict mode for build stability
  reactStrictMode: false,
  
  // Increase timeout for build
  staticPageGenerationTimeout: 1000,

  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
