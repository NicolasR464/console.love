/** @type {import('next').NextConfig} */


const withHtml = require('@blunck/next-html')()
const nextConfig = {
  transpilePackages: [
    'swagger-ui-react',
    'swagger-client',
    'react-syntax-highlighter',    
  ],
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  rewrites: async () => {
    return [
      {
        source: "/doc",
        destination: "/doc.html",
      }
    ]
},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
    ],

    domains: ["res.cloudinary.com", "randomuser.me"],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      aws4: false,
    };
    return config;
  },
};

module.exports = nextConfig;
