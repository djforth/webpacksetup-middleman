/* eslint-env node */
const {sync} = require('glob');
const {basename, resolve} = require('path');
const extname = require('path-complete-extname');
const {paths} = require('../configuration.js');

const extensionGlob = `*{${paths.extensions.join(',')}}*`;
console.log(paths.source, paths.entry, extensionGlob)
const packPaths = sync(resolve(paths.source, paths.entry, extensionGlob));
console.log("packPaths", packPaths)
module.exports = packPaths.reduce((map, entry)=>{
  const bname = paths.entry + '/' + basename(entry, extname(entry));
  const localMap = map;
  localMap[bname] = ['./'+ paths.entry + '/' + basename(entry)];
  return localMap;
}, {});
