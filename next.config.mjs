/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", has: [{ type: "host", value: "golf.atteres.io" }], destination: "/golf", permanent: false }];
  },
  async rewrites() {
    return { beforeFiles: [
      { source: "/", has: [{ type: "host", value: "me.atteres.io" }], destination: "/me/index.html" },
      { source: "/me", destination: "/me/index.html" },
      { source: "/", has: [{ type: "host", value: "mailliw.atteres.io" }], destination: "/mailliw/index.html" },
      { source: "/mailliw", destination: "/mailliw/index.html" },
      { source: "/", has: [{ type: "host", value: "themanicmoose.atteres.io" }], destination: "/manic-moose" },
      { source: "/", has: [{ type: "host", value: "daytrade.atteres.io" }], destination: "/daytrade" },
      { source: "/golf", destination: "/golf/index.html" },
      { source: "/", has: [{ type: "host", value: "jaybrandriet.atteres.io" }], destination: "/jaybrandriet/index.html" },
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
