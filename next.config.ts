import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults to [75]; 90 keeps factory photos crisp
    qualities: [75, 90],
  },
};

export default nextConfig;
