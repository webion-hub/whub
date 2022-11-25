import { getWebpackConfig } from '@nrwl/react/plugins/webpack.js';
import { Configuration } from 'webpack';

module.exports = (config: Configuration) => {
  getWebpackConfig(config);
  delete config.optimization?.minimizer;
  return config;
};
