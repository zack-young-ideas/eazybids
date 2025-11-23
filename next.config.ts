import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

if (process.env.NEXT_PUBLIC_DEMO === 'true') {
  nextConfig.assetPrefix = 'https://zack-young-ideas.github.io';
  nextConfig.basePath = '/eazybids';
  nextConfig.output = 'export';
}

export default nextConfig;
