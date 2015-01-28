var gulp = require('gulp');

var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var header = require('gulp-header');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var pkg = require('./package.json');
var umd = require('gulp-umd');

var paths = {
  output: 'dist/',
  scripts: [
    'src/wanderer.js'
  ]
};

var banner = [
  '/*! ',
  '<%= package.name %> ',
  'v<%= package.version %> | ',
  '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
  ' <%= package.homepage %> |',
  ' license <%= package.license %>',
  ' */',
  '\n'
].join('');

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(umd({
      dependencies: function() {
        return [{
          name: 'signals'
        }]
      },
      exports: function(file) {
        return 'wanderer';
      },
      namespace: function(file) {
        return 'wanderer';
      }
    }))
    .pipe(header(banner, {
      package: pkg
    }))
    .pipe(gulp.dest(paths.output))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(header(banner, {
      package: pkg
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('lint', function() {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() {
  return gulp.src(paths.output, {
      read: false
    })
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('build', ['scripts']);
