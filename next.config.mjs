/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return { beforeFiles: [
      { source: "/", has: [{ type: "host", value: "golf.atteres.io" }], destination: "/golf/index.html" },
      { source: "/golf", destination: "/golf/index.html" },
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
