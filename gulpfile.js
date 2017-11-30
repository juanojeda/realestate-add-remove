//Gulp tools
const del             = require('del');
const gulp            = require('gulp');
const config          = require('./config');
const runSequence     = require('run-sequence');
const $               = require('gulp-load-plugins')();

//Task bases
const serveTask       = require('./gulp/serve');
const imagesTask      = require('./gulp/images');
const extrasTask      = require('./gulp/extras');
const stylesTask      = require('./gulp/styles');
const scriptsTask     = require('./gulp/scripts');
const lintStylesTask  = require('./gulp/lintStyles');
const lintScriptsTask = require('./gulp/lintScripts');

//Task definitions
gulp.task('extras',       extrasTask(gulp));
gulp.task('images',       imagesTask(gulp, $));
gulp.task('lintStyles',   lintStylesTask(gulp, $));
gulp.task('lintScripts',  lintScriptsTask(gulp, $));

gulp.task('lint',         ['lintStyles', 'lintScripts']);

gulp.task('styles:dev',   stylesTask(gulp, $, { config: config.sass.dev, reload: true }));
gulp.task('styles:prod',  stylesTask(gulp, $, { config: config.sass.prod, reload: true }));
gulp.task('scripts:dev',  scriptsTask(gulp, $, { config: config.webpack.dev, reload: true }));
gulp.task('scripts:prod', scriptsTask(gulp, $, { config: config.webpack.prod, reload: true }));
gulp.task('clean',        del.bind(null, [config.paths.dist]));

// serve tasks
gulp.task('serve:dev',    serveTask(gulp, { env: 'dev' }));
gulp.task('serve:prod',   serveTask(gulp, { env: 'prod' }));
gulp.task('serve', ['serve:dev']);

// build for production
gulp.task('build', (done) => {
  runSequence(['clean'], ['lint', 'images', 'styles:prod', 'scripts:prod', 'extras'], done);
});

gulp.task('default', ['build'], () => {
  return gulp.src(`${config.paths.dist}/**/*`).pipe($.size({gzip: true, showFiles: true, title:'[built]'}));
});