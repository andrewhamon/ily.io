var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sourcemaps   = require('gulp-sourcemaps');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var filter       = require('gulp-filter');
var del          = require('del');
var ghPages      = require('gulp-gh-pages');
var rev          = require('gulp-rev');
// TODO - Add revisioning so I can bust some caches

var stylus       = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var nib          = require('nib');

var browserify   = require('browserify');
var uglify       = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('styles', function(){
  return gulp.src('./src/styles/main.styl')
    .pipe(sourcemaps.init())
      .pipe(stylus({compress: false, use: nib()}))
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
      }))
      .pipe(minifycss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/scripts/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('media', function(){
  return gulp.src('./src/media/**')
    .pipe(gulp.dest('./dist/media'))
});

gulp.task('clean', function(cb) {
    del(['./dist/**/*', './dist'], {'force': true}, cb);
});

gulp.task('build', ['html', 'styles', 'scripts', 'media']);

gulp.task('deploy-staging', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: "git@asdev.net:~/ily.io.git"
    }));
});

// gulp.task('revision', ['build'], function() {
//   return gulp.src('./dist/**/*')
// });


gulp.task('serve', ['build'], function(){
  browserSync({
        server: "./dist",
        tunnel: true,
        open: "local",
        browser: ["google chrome"],
        // browser: ["google chrome", "firefox", "safari", "opera"]
    });

  gulp.watch('./src/styles/**/*.styl', ['styles']);
  gulp.watch('./src/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
  gulp.watch('./src/media/**', ['media']).on('change', browserSync.reload);
});






