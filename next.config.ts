import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
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

    return config;
  },
};

export default nextConfig;
