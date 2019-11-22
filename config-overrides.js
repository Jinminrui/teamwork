/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

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
  })
);
