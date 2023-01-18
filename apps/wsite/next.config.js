module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
  },
  experimental: {
    nextScriptWorkers: true,
    transpilePackages: ["ui"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
