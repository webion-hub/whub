module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
  },
  experimental: {
    nextScriptWorkers: true,
    transpilePackages: ["@wui", "@wapi"],
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
