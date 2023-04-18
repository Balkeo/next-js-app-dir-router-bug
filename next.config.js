/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @returns {import('next').NextConfig}
 */
const nextConfig = () => {
  return {
    compress: true,
    swcMinify: true,
    reactStrictMode: true,
    experimental: {
      swcPlugins: [
        [
          "@swc/plugin-styled-components",
          {
            displayName: true,
            ssr: true,
          },
        ],
      ],
      appDir: true,
    },
    compiler: {
      styledComponents: {
        displayName: true,
        ssr: true,
      },
    },
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js", "api.ts"],
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
};

module.exports = nextConfig();
