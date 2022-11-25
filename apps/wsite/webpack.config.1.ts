import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { getWebpackConfig } from '@nrwl/react/plugins/webpack.js';

module.exports = (config: Configuration) => {
  getWebpackConfig(config);
  config.optimization?.minimizer?.push(
    new TerserPlugin({
      minify: TerserPlugin.swcMinify,
      terserOptions: {},
    })
  );
  return config;
};
