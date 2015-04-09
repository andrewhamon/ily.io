var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    del = require('del'),
    filter = require('gulp-filter');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('styles', function(){
  return gulp.src('source/styles/main.styl')
    .pipe(sourcemaps.init())
      .pipe(stylus({compress: false}))
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
      .pipe(minifycss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/styles'))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
  return gulp.src('source/**/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('clean', function(cb) {
    del(['build/**/*', 'build'], {'force': true}, cb);
});

gulp.task('build', ['html', 'styles']);

gulp.task('serve', ['build'], function(){
  browserSync({
        server: "./build"
    });

  gulp.watch('source/styles/**/*.styl', ['styles']);
  gulp.watch('source/**/*.html', ['html']).on('change', browserSync.reload);
});






