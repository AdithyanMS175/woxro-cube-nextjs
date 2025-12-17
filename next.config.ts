import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
   devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
}

module.exports = nextConfig
