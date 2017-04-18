/* eslint-env node */
const {env, paths, amazonS3} = require('../configuration.js');
const date = new Date();
const timeStamp = date.getTime();
const {getIfUtils} = require('webpack-config-utils');

const {ifDevelopment} = getIfUtils(env);

module.exports = ()=>{
  if (!amazonS3) return paths.entry;
  return ifDevelopment(paths.entry, `${paths.entry}/${timeStamp}`);
};
