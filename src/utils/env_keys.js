/* eslint-env node */

module.exports = (env)=>{
  return Object.keys(env).filter((key)=>env[key] !== undefined || env[key] !== null);
};
