const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: [
    "@wui/core",
    "@wui/components",
    "@wui/wrappers",
    "@wui/layout",
    "@wui/extensions",
    "@wapi/contactus",
    "@wapi-ui/contactus",
  ],
  modularizeImports: {
    '@wui/wrappers': {
      transform: '@wui/wrappers/{{member}}',
    },
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
    locales: ['it'],
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
