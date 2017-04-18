const S3Plugin = require('webpack-s3-plugin');
const {
  env
  , amazonS3
  , basePath
} = require('../configuration.js');

// const BasePath = require('../utils/base_path');
const aws = amazonS3[env.RAILS_ENV];
const baseDir = aws.baseDir;

module.exports = [
  new S3Plugin({
    basePath: `${baseDir}/${basePath}`
    // Only upload css and js
    , include: /.*\.(css|js|jpg|jpeg|png|svg|gif)/
    // s3Options are required
    , s3Options: {
      accessKeyId: aws.accessKeyId
      , secretAccessKey: aws.secretAccessKey
    }
    , s3UploadOptions: {
      Bucket: aws.bucket
      , CacheControl: 'max-age=315360000'
      , ContentEncoding(fileName){
        if (/\.gz/.test(fileName)){
          return 'gzip';
        }
      }

      , ContentType(fileName){
        if (/\.js/.test(fileName)){
          return 'application/x-javascript';
        } else if (/\.css/.test(fileName)){
          return 'text/css';
        } else if (/\.jp?eg/.test(fileName)){
          return 'image/jpeg';
        } else if (/\.png/.test(fileName)){
          return 'image/png';
        } else if (/\.gif/.test(fileName)){
          return 'image/gif';
        } else if (/\.svg/.test(fileName)){
          return 'image/svg+xml';
        }
      }
      , Expires(){
        let date = new Date();
        date.setMonth(date.getMonth()+11);
        return date;
      }
    }
  })
];
