const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
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
