const {join, resolve} = require('path');
const process = require('process');
const {safeLoad} = require('js-yaml');
const {readFileSync} = require('fs');

const env = process.env;
const configPath = resolve('config', 'webpack');
const loadersDir = join(__dirname, 'loaders');
const paths = safeLoad(readFileSync(join(configPath, 'paths.yml'), 'utf8'));
const devServer = safeLoad(readFileSync(join(configPath, 'development.server.yml'), 'utf8'));

let amazonS3;
try {
  amazonS3 = safeLoad(readFileSync(join(configPath, 'amazons3.yml'), 'utf8'));
} catch (e){
  amazonS3 = false;
}

const date = new Date();
const timeStamp = date.getTime();
const basePath = `${paths.entry}/${timeStamp}`;

const publicPathCheck = (node_env, ds, aws)=>{
  if (node_env === 'development' && ds.enabled){
    return `http://${devServer.host}:${devServer.port}/`;
  } else if (aws){
    let cloudfront = aws[node_env].cloudfront;
    let baseDir = aws[node_env].baseDir;
    return `${cloudfront}/${baseDir}/${basePath}/`;
  }

  return `/${paths.entry}/`;
};

const publicPath = publicPathCheck(env.RAILS_ENV, devServer, amazonS3);

module.exports = {
  amazonS3
  , basePath
  , devServer
  , env
  , paths
  , loadersDir
  , publicPath
};
