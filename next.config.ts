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
  // Explicitly include the swisseph-v2 native binary in Vercel's file trace so
  // the .node addon is packaged into the serverless function bundle.
  outputFileTracingIncludes: {
    '/api/**': ['./node_modules/swisseph-v2/**/*'],
  },
};

export default nextConfig;
