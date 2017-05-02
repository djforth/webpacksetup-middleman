/* eslint-env node */
const {sync} = require('glob');
const {basename, resolve} = require('path');
const extname = require('path-complete-extname');
const {paths} = require('../configuration.js');

const extensionGlob = `*{${paths.extensions.join(',')}}*`;

const stylesheetEntries = ()=>{
  let pathToCSS = resolve(paths.source, paths.stylesheets_entry, extensionGlob);
  return sync(pathToCSS).reduce((map, entry)=>{
    const bname = paths.stylesheets_entry + '/' +  basename(entry, extname(entry));
    map[bname] = './'+ paths.stylesheets_entry + '/' + basename(entry);
    return map;
  }, {});
};

module.exports = (paths.stylesheets_entry) ? stylesheetEntries() : {};
