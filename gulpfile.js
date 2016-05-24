'use strict'

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');

var htmlmin     = require('gulp-htmlmin');
var cleanCSS    = require('gulp-clean-css')

gulp.task('default', ['browser-sync']);
gulp.task('minifica', ['min-html', 'min-css']);

// Static Serve and watching sass/pug/html files
gulp.task('browser-sync', ['sass', 'pug'], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch('assets/sass/*.sass', ['sass']);
  gulp.watch('pugfiles/*.pug', ['pug']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// Convertendo SASS pra CSS
gulp.task('sass', function() {
  return gulp.src('assets/sass/**.{sass,scss}')
    .pipe(sass({ onError: browserSync.notify }))
    .pipe(prefix({ browsers: ['last 2 versions'], }))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({stream:true}))
});

// Pug para Html
gulp.task('pug', function(){
    return gulp.src('pugfiles/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'));
});

// minify html
gulp.task('min-html', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true, remoeComments: true}))
    .pipe(gulp.dest('./'))
});
// compress css
gulp.task('min-css', function() {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('assets/css/'))
});
