const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const {env, publicPath} = require('../configuration.js');

const {ifProduction} = getIfUtils(env.NODE_ENV);

module.exports = {
  test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i
  , use: removeEmpty([
    {
      loader: 'file-loader'
      , options: {
        limit: 1000
        , publicPath
        , name: ifProduction('[path][name]-[hash].[ext]', '[path][name].[ext]')
      }
    }

    , ifProduction({
        loader: 'img-loader'
        , options: {
          publicPath
          , name: '[name]-[hash].[ext]'
        }
      })
  ])
};
