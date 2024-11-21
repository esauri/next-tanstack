import { TanStackRouterWebpack } from "@tanstack/router-plugin/webpack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(TanStackRouterWebpack());

    return config;
  },
};

export default nextConfig;
