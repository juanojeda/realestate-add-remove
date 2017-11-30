const config =            require('../config');

// provide code hints and linting to keep everything
// looking spick and span
module.exports = (gulp, $) => {
  return () => {
    return gulp.src(`${config.paths.styles}/**/*.s+(a|c)ss`)
      .pipe($.sassLint())
      .pipe($.sassLint.format())
      .pipe($.sassLint.failOnError());
  };
};
