const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: [
    "@webion/ui-core",
    "@webion/ui-components",
    "@webion/ui-squares",
    "@webion/ui-wrappers",
    "@webion/ui-layout",
    "@webion/ui-extensions",
    "@webion/ui-sections",
    "@webion/ui-form",
    "@webion/api-blog",
    "@webion/api-contactus",
  ],
  modularizeImports: {
    '@webion/ui-wrappers': {
      transform: '@webion/ui-wrappers/{{member}}',
    },
    '@webion/ui-squares': {
      transform: '@webion/ui-squares/{{member}}',
    },
    '@webion/ui-components': {
      transform: '@webion/ui-components/{{member}}',
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
