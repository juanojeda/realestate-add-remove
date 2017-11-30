var notify =  require('gulp-notify');

// consistently handle build and compile errors
module.exports = function() {
  const args = Array.prototype.slice.call(arguments);
  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};
