import gulp from 'gulp'
import sequence from 'run-sequence'
import plumber from 'gulp-plumber'
import source from 'vinyl-source-stream'
import del from 'del'
import fs from 'fs'
import path from 'path'
import sh from 'shelljs'

// Notifications
import notify from 'gulp-notify'

// Style things
import stylus from 'gulp-stylus'
import nib from 'nib'

// Front end *ifyers
import browserifyInc from 'browserify-incremental'
import babelify from 'babelify'
import envify from 'envify'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'

// Dev server stuff
import history from 'connect-history-api-fallback'
import browserSync from 'browser-sync'
import connectLogger from 'connect-logger'

// Releasing
import surge from 'gulp-surge'

// Environment
import dotenv from 'dotenv'
dotenv.load()

// *************************************************************************************************
// Configuration
// *************************************************************************************************

const buildDir = 'build'
const pagesPath = 'pages'
const dataPath = './data/data.json'
const scriptsDir = 'scripts'
const stylesPath = 'styles/main.styl'
const imagesDir = 'images'

// *************************************************************************************************
// Top-level tasks
// *************************************************************************************************

gulp.task('default', [ 'build' ])

gulp.task('serve', [ 'watch' ], cb => (
  sequence([ 'browsersync' ], cb)
))

gulp.task('build', cb => (
  sequence('clean', [ 'styles', 'bundle', 'index', 'assets' ], cb)
))

gulp.task('release', [ 'uglify', 'release:create', 'release:cleanup' ])

gulp.task('watch', [ 'build' ], cb => (
  sequence([ 'styles:watch', 'bundle:watch', 'pages:watch', 'assets:watch' ], cb)
))

// *************************************************************************************************
// Sub-tasks
// *************************************************************************************************

gulp.task('clean', () => (
  del([ path.join(buildDir, '**/*') ])
))

gulp.task('styles', () => (
  gulp.src(stylesPath)
    .pipe(plumber({ errorHandler: notify.onError('Error <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(stylus({ use: [ nib() ] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(buildDir, 'styles')))
    .pipe(browserSync.stream())
))

gulp.task('styles:watch', () => (
  gulp.watch(path.join('styles', '**/*.styl'), [ 'styles' ])
))

gulp.task('assets', () => (
  gulp.src(path.join(imagesDir, '**/*'))
    .pipe(gulp.dest(path.join(buildDir, imagesDir)))
    .pipe(browserSync.stream())
))

gulp.task('assets:watch', () => (
  gulp.watch(path.join(imagesDir, '**/*'), [ 'assets' ])
))

gulp.task('index', () => (
  gulp.src('200.html')
    .pipe(gulp.dest(buildDir))
    .pipe(browserSync.stream())
))

gulp.task('pages:watch', () => {
  gulp.watch('200.html', [ 'index' ])
})

var bundleOpts = { debug: true, paths: [ './scripts' ], cacheFile: '.browserifyCache.json' }
var bundler = browserifyInc('scripts/app.js', bundleOpts)
bundler.transform(babelify)
bundler.transform(envify)

gulp.task('bundle', () => (
  bundler.bundle()
    .on('error', notify.onError('Error <%= error.message %>'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(path.join(buildDir, scriptsDir)))
    .pipe(browserSync.stream())
))

gulp.task('bundle:watch', () => (
  gulp.watch(path.join(scriptsDir, '**/*.js'), [ 'bundle' ])
))

gulp.task('browsersync', () => {
  browserSync({
    server: {
      baseDir: buildDir,
      middleware: [ history({ index: '/200.html' }), connectLogger() ]
    },
    open: true,
    notify: true
  })
})

gulp.task('uglify', [ 'build' ], () => (
  gulp.src(path.join(buildDir, scriptsDir, 'bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(buildDir, scriptsDir)))
))

gulp.task('deploy', [ 'build', 'uglify' ], () => {
  var branch = sh.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).output.trim()
  var changes = sh.exec('git diff-files --quiet --ignore-submodules').code !== 0

  if (branch !== 'master' || changes) {
    throw new Error('the current git branch must be `master` and there must be no uncommitted changes.')
  }

  return surge({
    project: buildDir,
    domain: fs.readFileSync('./CNAME')
  })
})
