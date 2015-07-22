var gulp       = require('gulp')
  , ts         = require('gulp-typescript')
  , tslint     = require('gulp-tslint')
  , babel      = require('gulp-babel')
  , browserify = require('gulp-browserify')
  ;



var app = ts.createProject({
    declarationFiles: false,
    target: 'ES6',
    typescript: require('typescript')
});


gulp.task('lint', function() {
    return gulp.src(['src/**/*.ts', '!src/ext/*'], { base: './' })
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('compile', function() {
    var project = gulp.src(['src/**/*.ts']).pipe(ts(app));
    return project.js.pipe(babel()).pipe(gulp.dest('dist/build/'));
});

gulp.task('default', ['compile'], function() {
    return gulp.src(['dist/build/main.js'])
        .pipe(browserify({ paths: ['dist/build/'], standalone: 'main' }))
        .pipe(gulp.dest('dist/tmp/'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/**/*.ts', ['default']);
});
