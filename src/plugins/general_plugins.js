/* eslint-env node */
const webpack = require('webpack');
const {getIfUtils} = require('webpack-config-utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PackEntries = require('../entries/pack_entries');

const {
  env
  , publicPath
} = require('../configuration.js');

const {ifProduction} = getIfUtils(env.NODE_ENV);

module.exports = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common'
    , chunks: Object.keys(PackEntries)
  })
  , new ExtractTextPlugin(
    ifProduction('[name]-[hash].css', '[name].css')
  )
  , new LodashModuleReplacementPlugin
  , new webpack.EnvironmentPlugin(
    JSON.parse(JSON.stringify(env))
  )
  , new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  , new ManifestPlugin({
    fileName: 'manifest.json'
    , publicPath
    , writeToFileEmit: true
  })

  , new webpack.LoaderOptionsPlugin(ifProduction(
    {
      minimize: true
      , debug: false
    }
    , {
      debug: true
    }
  ))

  // , new BundleAnalyzerPlugin()
];
