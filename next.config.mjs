/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", has: [{ type: "host", value: "golf.atteres.io" }], destination: "/golf", permanent: false }];
  },
  async rewrites() {
    return { beforeFiles: [
      { source: "/golf", destination: "/golf/index.html" },
      { source: "/jaybrandriet", destination: "/jaybrandriet/index.html" },
    ] };
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
