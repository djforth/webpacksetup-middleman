const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const uglifierSetting = {
  compress: {
    warnings: false
    , screw_ie8: true
    , unused: true
    , dead_code: true
  }
  , output: {
    comments: false
  }
  , sourceMap: false
  , mangle: true
  , minimize: true
};

module.exports = [
  new webpack.optimize.UglifyJsPlugin(uglifierSetting)
  , new CompressionPlugin({
      asset: '[path].gz[query]'
      , algorithm: 'gzip'
      , test: /\.js|.css$/
      , minRatio: 1
  })

];
