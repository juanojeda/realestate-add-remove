const webpack =           require('webpack');
const webpackStream =     require('webpack-stream');
const browserSync =       require('browser-sync');
const config =            require('../config');
const handleError =       require('./handleError');

// pass js source files through webpack, to allow use
// of es6, as well as allowing bundling, minifaction etc
module.exports = (gulp, $, options) => {
  return () => {
    return gulp.src(`${config.paths.scripts}/main.js`)
      .pipe(webpackStream(options.config, webpack))
      .on('error', handleError)
      .pipe(gulp.dest(`${config.paths.dist}/js`))
      .pipe($.if(options.reload, browserSync.reload({stream: true})));
  };
};
