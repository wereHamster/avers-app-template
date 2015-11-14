var gulp       = require('gulp')
  , util       = require('gulp-util')
  , rename     = require('gulp-rename')
  , ts         = require('gulp-typescript')
  , tslint     = require('gulp-tslint')
  , babel      = require('gulp-babel')
  , connect    = require('gulp-connect')
  , source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')
  , merge      = require('merge-stream')
  , browserify = require('browserify')
  , babelify   = require('babelify')
  ;



// Load config from the tsconfig.json file, to keep it in a central place. This
// way the editor can see the same config, and when you run the TypeScript
// compiler from the commandline it will also use the same config.

var app = ts.createProject('tsconfig.json');



// Linting keeps the codebase clean and bugfree!

gulp.task('lint', function() {
    return gulp.src(['src/**/*.ts', '!src/ext/*'], { base: './' })
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});



// The 'compile' task takes all TypeScript source files in 'src/' and writes
// the output to 'dist/js/'.
//
// This task must be run manually when you want to build the app from the
// commandline. The reason is that sometimes it's more efficient or faster to
// run the typescript compiler in a separate terminal window (in watch mode),
// and some editors (e.g. Atom) have plugins which can compile the files
// immediately upon save.

gulp.task('compile', function() {
    return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
        .pipe(ts(app)).js
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('compile:watch', function() {
    gulp.watch(['src/**/*.ts','src/**/*.tsx'], ['compile']);
});



// Until browsers support ES6 modules natively it's easier to bundle files
// during build time and ship one or a few bundles to the client. We create
// two bundles: one with the main application and one with the small config
// object. That way you can easily define multiple environments (e.g.
// development and production).
//
// Note that these tasks have no explicit dependency on the 'compile' task,
// to cater for the case when you want to do the compilation yourself.

gulp.task('bundle', function() {
    var browserifyConfig =
        { entries: 'dist/js/main.js'
        , paths: ['dist/js/']
        , standalone: 'main'
        };

    return browserify(browserifyConfig)
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/bundles/'));
});

gulp.task('bundle:watch', function() {
    gulp.watch('dist/js/**/*.js', ['bundle']);
});



// The task to build the files which need to be pre-processed. This task is
// used by the deploy script.

gulp.task('build', ['compile'], function() {
    gulp.start('bundle');
});



// The default task builds the app, sets up watchers and starts a local web
// server. It does everything you need to get started working on the app.

gulp.task('default', ['build', 'compile:watch', 'bundle:watch'], function() {
    connect.server({
        root: ['assets','dist/bundles'],
        port: 4000,
        fallback: 'assets/index.html',
    });
});
