/* eslint-env node */
const {resolve} = require('path');
const utils = require('@djforth/ap_utils');
const {paths} = require('../configuration.js');

const deleteFolder = utils.delete.folder;
const outputs = [
  resolve(paths.output, paths.entry)
  , resolve(paths.output, paths.stylesheets_entry)
  , resolve(paths.output, paths.image_entry)
]

const clear = outputs.map((output)=>{
  return deleteFolder(output, `*{${paths.extensions.join(',')}}*`);
})




module.exports = ()=>{
  clear.forEach((clearPack)=>{
    clearPack(()=>{
      console.log('Packs clear');
    });
  });
};
