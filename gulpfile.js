'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components'
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', function () {
  console.log('\n  USAGE:\n' +
    '  `gulp build` to build an optimized version of your application in `/dist`\n' +
    '  `gulp serve` to launch a browser sync server on your source files\n' +
    '  `gulp serve:dist` to launch a server on your optimized application\n' +
    '  `gulp test` to launch your unit tests with Karma\n' +
    '  `gulp test:auto` to launch your unit tests with Karma in watch mode\n' +
    '  `gulp protractor` to launch your e2e tests with Protractor\n' +
    '  `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files\n');
});
