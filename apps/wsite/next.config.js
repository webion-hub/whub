//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  productionBrowserSourceMaps: true,
  output: 'standalone',
  webpack: (config) => {
    config.optimization?.minimizer?.push(
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {},
      })
    );

    config.plugins.push(
      new LodashModuleReplacementPlugin(),
      new CompressionPlugin(),
      //new BundleAnalyzerPlugin(),
    )

    return config
  }
};

module.exports = withNx(nextConfig);
