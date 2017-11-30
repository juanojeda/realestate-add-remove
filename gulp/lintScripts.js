const config = require('../config');

// provide code hints and linting to keep everything
// looking spick and span
module.exports = (gulp, $) => {
  return () => {
    return gulp.src(`${config.paths.scripts}/**/*.js`)
      .pipe($.eslint(
        {
          'ecmaFeatures': {
            'sourceType': 'module'
          },
          'parserOptions': {
            'sourceType': 'module'
          }
        }
      ))
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
  };
};
