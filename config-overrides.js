/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
  addBabelPlugins,
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
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
    modifyVars: { '@primary-color': '#597ef7' },
  }),
  addWebpackAlias({
    '@': resolve('src'),
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  addBabelPlugins('@babel/plugin-proposal-optional-chaining')
  // addWebpackPlugin(new BundleAnalyzerPlugin())
);
