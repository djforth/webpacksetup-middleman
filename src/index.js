/* eslint-env node */
const {basename, join, resolve} = require('path');
const {readdirSync} = require('fs');
const extname = require('path-complete-extname');
const clearPacks = require('./utils/clear_files');

const {
  devServer
  , env
  , loadersDir
  , paths
  , publicPath
} = require('./configuration.js');

const {
  getIfUtils
  , removeEmpty
} = require('webpack-config-utils');

console.log('env', env.NODE_ENV)

const {ifDevelopment, ifProduction} = getIfUtils(env.NODE_ENV);

if (env.NODE_ENV === 'production'){
  clearPacks();
}

let plugins = require('./plugins');
let entry = require('./entries');
console.log('entry >>>>>>', entry)
const modules = removeEmpty([
  resolve('src')
  , resolve(paths.source, paths.entry)
  , (paths.image_entry) ? resolve(paths.source, paths.image_entry) : undefined
  , (paths.stylesheets_entry) ? resolve(paths.source, paths.stylesheets_entry) : undefined
  , resolve(paths.node_modules)
]);

const rules = removeEmpty(
  readdirSync(loadersDir, 'utf8').map((file)=>{
    if (extname(file) === '.js'){
      if (!paths.stylesheets_entry && basename(file) === 'sass.js'){
        return;
      } else if (!paths.image_entry && basename(file) === 'assets.js'){
        return;
      }

      return require(join(loadersDir, file));
    }
  })
);

const config = {
  devtool: ifProduction('source-map', 'eval')
  , context: resolve(paths.source)
  , entry
  , output: {
    filename: ifProduction('[name]-[chunkhash].js', '[name].js')
    , path: resolve(paths.output)
    , pathinfo: true
    , publicPath: ifDevelopment(`/${paths.output}/`)
  }

  , module: {
    rules
  }

  , plugins

  , resolve: {
    extensions: paths.extensions
    , alias: {
      images: resolve(paths.source, 'images')
    }
    , modules
  }

  , resolveLoader: {
    modules: [resolve(paths.node_modules)]
  }

  , stats: {
    cached: true
    , colors: true
    , errorDetails: true
    , errors: true
  }
};

module.exports = {
  config
  , devServer: {devServer: {
      hot: true
      , host: devServer.host
      , port: devServer.port
      , compress: true
      , historyApiFallback: true
      , contentBase: resolve(paths.output, paths.entry)
      , publicPath
    }
  }
};
