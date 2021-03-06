const {join, resolve} = require('path');
const process = require('process');
const {safeLoad} = require('js-yaml');
const {readFileSync} = require('fs');

const {NODE_ENV} = process.env;
process.env.NODE_ENV = (NODE_ENV) ? NODE_ENV : 'development';
const env = process.env;

const configPath = resolve('config');
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
  console.log(node_env === 'development', ds.enabled)
  if (node_env === 'development' && ds.enabled){
    return `http://${ds.host}:${ds.port}/`;
  } else if (aws){
    let cloudfront = aws[node_env].cloudfront;
    let baseDir = aws[node_env].baseDir;
    return `${cloudfront}/${baseDir}/${basePath}/`;
  }

  return `/`;
};

const publicPath = publicPathCheck(env.NODE_ENV, devServer, amazonS3);

module.exports = {
  amazonS3
  , basePath
  , devServer
  , env
  , paths
  , loadersDir
  , publicPath
};
