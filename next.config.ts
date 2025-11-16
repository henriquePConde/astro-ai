import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure these native packages are available to server components (Node runtime)
  serverExternalPackages: ['puppeteer'],
  webpack: (config, { isServer }) => {
    // Handle native .node modules (swisseph-v2)
    if (isServer) {
      // On server-side, mark swisseph-v2 as external so it uses require() at runtime
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push('swisseph-v2');
      } else {
        config.externals = [config.externals, 'swisseph-v2'];
      }
    } else {
      // On client-side, ignore the module entirely (it's server-only)
      config.resolve.alias = {
        ...config.resolve.alias,
        'swisseph-v2': false,
      };
    }

    // Don't try to parse .node files - they're native binaries loaded at runtime
    config.module.rules.push({
      test: /\.node$/,
      type: 'asset/resource',
    });

    // Ensure path alias '@' resolves to 'src' in all environments
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },
};

export default nextConfig;
