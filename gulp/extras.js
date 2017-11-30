const config =            require('../config');

// copy extra files across to output folder
module.exports = (gulp) => {
  return () => {
    return gulp.src([
      'src/data/**/*',
      'src/fonts/**/*',
      `${config.paths.src}/*.{ico,txt,png,config,html}`
    ], {'base': `${config.paths.src}`})
    .pipe(gulp.dest(`${config.paths.dist}/`));
  };
};
