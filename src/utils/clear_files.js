/* eslint-env node */
const {resolve} = require('path');
const utils = require('@djforth/ap_utils');
const {paths} = require('../configuration.js');

const deleteFolder = utils.delete.folder;
const output = resolve(paths.output, paths.entry);

const clearPacks = deleteFolder(output, `*{${paths.extensions.join(',')}}*`);

module.exports = ()=>{
  clearPacks(()=>{
    console.log('Packs clear');
  });
};
