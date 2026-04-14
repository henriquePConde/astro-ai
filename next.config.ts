import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure these native packages are available to server components (Node runtime)
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core', 'swisseph-v2'],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
