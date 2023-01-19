const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: [
    "@wui/core",
    "@wui/components",
    "@wui/squares",
    "@wui/wrappers",
    "@wui/layout",
    "@wui/extensions",
    "@wui/sections",
    "@wui/form",
    "@wapi/blog",
    "@wapi/contactus",
    "@wapi/next"
  ],
  modularizeImports: {
    '@wui/squares': {
      transform: '@wui/squares/{{member}}',
    },
    '@wui/components': {
      transform: '@wui/components/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
  },
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});
