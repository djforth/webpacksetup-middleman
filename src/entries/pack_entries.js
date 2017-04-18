/* eslint-env node */
const {sync} = require('glob');
const {basename, resolve} = require('path');
const extname = require('path-complete-extname');
const {paths} = require('../configuration.js');

const extensionGlob = `*{${paths.extensions.join(',')}}*`;
const packPaths = sync(resolve(paths.source, paths.entry, extensionGlob));

module.exports = packPaths.reduce((map, entry)=>{
  const bname = basename(entry, extname(entry));
  const localMap = map;
  localMap[bname] = ['./'+ paths.entry + '/' + basename(entry), '@morsedigital/morse-marker'];
  return localMap;
}, {});
