const webpackConfig = require('./webpack.config');

const PATHS = {
  src     : 'src',
  dist    : 'dist',
  scripts : 'src/js',
  styles  : 'src/scss',
  data    : 'src/data',
  images  : 'src/images'
};

module.exports = {
  paths  : PATHS,
  webpack: {
    dev  : webpackConfig.dev,
    prod : webpackConfig.prod
  },
  sass: {
    dev: {
      outputStyle : 'expanded',
      precision   : 10,
      includePaths: [
        './node_modules',
        './node_modules/foundation-sites/scss'
      ],
      sourcemaps  : true
    },
    prod: {
      outputStyle : 'compressed',
      precision   : 10,
      includePaths: ['./node_modules']
    },
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }
  },
  imagemin: {
    jpg : 80,
    gif : 3,
    png : 80
  }
};
