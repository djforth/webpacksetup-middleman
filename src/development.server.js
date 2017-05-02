// Note: You must restart bin/webpack-dev-server for changes to take effect

const {resolve} = require('path');
const merge = require('webpack-merge');
const config = require('./index');
const {devServer, publicPath, paths} = require('./configuration.js');
module.exports = merge(config, {
  devServer: {
    hot: true
    , host: devServer.host
    , port: devServer.port
    , compress: true
    , historyApiFallback: true
    , contentBase: resolve(paths.output)
    , publicPath
  }
});
