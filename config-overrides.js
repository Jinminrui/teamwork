/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addBabelPlugins,
} = require('customize-cra');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

process.env.GENERATE_SOURCEMAP = 'false';

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#40a9ff' },
  }),
  addWebpackAlias({
    '@': resolve('src'),
  }),
  addBabelPlugins('@babel/plugin-proposal-optional-chaining')
  // addWebpackPlugin(new BundleAnalyzerPlugin())
);
