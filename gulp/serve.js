'use strict';

const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const config      = require('../config');
const ngrok       = require('ngrok');
const url         = require('url');
const fs          = require('fs');
const path        = require('path');

// serve the development version of the site using ngrok,
// making it easy to test on devices and with differing
// network conditions
const tunnel = (error, bsync) => {
  ngrok.connect(bsync.options.get('port'), (_e, url) => {
    console.log(`[NGROK] Started at: ${url}`);
  });
};

const folder = path.resolve(config.paths.dist);

module.exports = (gulp, options) => {
  
  // if there's a request for a file and that file exists,
  // serve that file. Otherwise, redirect to root route
  const catchAll = (req, res, next) => {
    let fileName = url.parse(req.url);
    fileName = fileName.href.split(fileName.search).join('');
    const fileExists = fs.existsSync(folder + fileName);
    if (!fileExists && fileName.indexOf('browser-sync-client') < 0) {
      req.url = '/';
    }
    return next();
  };

  return () => {
    runSequence(['clean'], [`styles:${options.env}`, `scripts:${options.env}`, 'extras', 'images'], () => {
      browserSync({
        startPath: '/',
        notify: false,
        port: 3000,
        server: {
          baseDir: [config.paths.dist],
          routes: {},
          // config for api proxy above
          middleware: catchAll
        }
      },
      tunnel);

      // refresh the server if any source paths change
      gulp.watch([`${config.paths.src}/images/**/*`]).on('change', browserSync.reload);
      gulp.watch([
        `${config.paths.src}/index.html`,
        `${config.paths.data}/**/*`
      ], ['extras']);
      gulp.watch(`${config.paths.styles}/**/*.scss`, [ 'lintStyles', `styles:${options.env}`]);
      gulp.watch(`${config.paths.scripts}/**/*`, ['lintScripts', `scripts:${options.env}`]);
    });
  };
};
