const {env, amazonS3} = require('../configuration.js');

let plugins = require('./general_plugins');
plugins = plugins.concat(require(`./${env.NODE_ENV}_plugins`));

if (amazonS3 && env.NODE_ENV !== 'development'){
  plugins = plugins.concat(require('./amazonS3_plugin'));
}

module.exports = plugins;
