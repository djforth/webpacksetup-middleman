const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const {resolve} = require('path');
const {env, paths} = require('../configuration.js');
const {ifDevelopment, ifProduction} = getIfUtils(env.NODE_ENV);

const includePaths = (paths)=>{
  let includePaths = ['node_modules'].map((key)=>{
    return resolve(paths[key]);
  });


  includePaths = includePaths.concat(['stylesheets_entry', 'image_entry'].map((key)=>{
    return resolve(paths.source, paths[key]);
  }));

  return removeEmpty(includePaths.concat(require('bourbon').includePaths));
};

module.exports = {
  test: /\.(scss|sass|css)(\.erb)?$/i
  , use: ExtractTextPlugin.extract({
    fallback: 'style-loader'
    , use: removeEmpty([
      {
        loader: 'css-loader'
        , options: {
          minimize: ifProduction()
          , sourceMap: true
        }
      }
      , 'resolve-url-loader'
      , {
        loader: 'postcss-loader'
        , options: { sourceMap: true }
      }
      , {
        loader: 'sass-loader'
        , options: {
          includePaths: includePaths(paths)
          , outputStyle: 'extended'
          , sourceMap: true
          , sourceComments: ifDevelopment()
        }
      }
    ])
  })
};
