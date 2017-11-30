const browserSync =       require('browser-sync');
const config =            require('../config');

// convert scss/sass to css, build sourcemaps, autoprefix
// the css, and output it to the build directory. Hydrate
// the browser with the updated styles
module.exports = (gulp, $, options) => {
  return () => {
    return gulp.src(`${config.paths.styles}/**/*.scss`)
      .pipe($.plumber())
      .pipe($.if(options.config.sourcemaps, $.sourcemaps.init()))
      .pipe($.sass.sync(options.config).on('error', $.sass.logError))
      .pipe($.autoprefixer(config.sass.autoprefixer))
      .pipe($.if(options.config.sourcemaps, $.sourcemaps.write()))
      .pipe(gulp.dest(`${config.paths.dist}/css`))
      .pipe($.if(options.reload, browserSync.reload({stream: true})));
  };
};
