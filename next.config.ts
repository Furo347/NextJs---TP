import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "graphqlstore.julienfroidefond.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;