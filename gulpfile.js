var gulp = require('gulp');
var clean = require('gulp-clean')
var useref = require('gulp-useref')
var runSequence = require('run-sequence')
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector')
var minifyHtml = require('gulp-minify-html')
var pump = require('pump')
var uglify = require('gulp-uglify')
var cleanCss= require('gulp-clean-css')
var htmlmin = require('gulp-minify-html')


var ASSETS = './assets'

var SRC = {
  images: ASSETS + '/images/**/*'
}

var TMP = './release/tmp'
var TMP_DEST = {
  pages: TMP + '/pages',
  images: TMP + '/images',
  js: TMP + '/js',
  css: TMP + '/css',
}
var TMP_SRC = {
  js: TMP + '/js/**/*.js',
  css: TMP + '/css/**/*.css',
  pages: TMP + '/pages/*.html',

}

var REV = TMP + '/rev';
var REV_DEST = {
  js: REV + '/js',
  css: REV + '/css',
  images: REV + '/images',
}


var REV_MANIFEST = TMP + '/rev_manifest';
var REV_MANIFEST_DEST = {
  js: REV_MANIFEST + '/js',
  css: REV_MANIFEST + '/css',
}
var REV_MANIFEST_SRC = {
  json: REV_MANIFEST + '/**/*.json'
}

var MIN = './release/min'
var MIN_SRC = {
  js: REV + '/js/**/*.js',
  css: REV + '/css/**/*.css',
}
var MIN_DEST = {
  js: MIN + '/js',
  css: MIN + '/css',
  pages: MIN + '/pages',
  images: MIN + '/images'
}




gulp.task('clean', function () {
  return gulp.src(['release/**/*'])
    .pipe(clean());
})

gulp.task('useref', function () {
  return gulp.src('pages/*.html')
    .pipe(useref())
    .pipe(gulp.dest(TMP_DEST.pages))
})

gulp.task('copy', function () {
  // copy assets images
  return gulp.src([SRC.images])
    .pipe(gulp.dest(MIN_DEST.images))
})

gulp.task('rev-hash-js', function () {
  return gulp.src(TMP_SRC.js)
    .pipe(rev())
    .pipe(gulp.dest(REV_DEST.js))
    .pipe(rev.manifest())
    .pipe(gulp.dest(REV_MANIFEST_DEST.js));

})
gulp.task('rev-hash-css', function(){
  return gulp.src(TMP_SRC.css)
    .pipe(rev())
    .pipe(gulp.dest(REV_DEST.css))
    .pipe(rev.manifest())
    .pipe(gulp.dest(REV_MANIFEST_DEST.css));
})


gulp.task('rev-html-replace', function () {
  return gulp.src([REV_MANIFEST_SRC.json, TMP_SRC.pages])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        'css/': 'css/',
        'js/': 'js/'
      }
    }))
    .pipe(gulp.dest(TMP_DEST.pages));
})

gulp.task('min-js', function(){
  return gulp.src(MIN_SRC.js)
    .pipe(uglify())
    .pipe(gulp.dest(MIN_DEST.js))
  // pump([
  //     gulp.src(MIN_SRC.js),
  //     uglify(),
  //     gulp.dest(MIN_DEST.js)
  //   ],
  //   cb
  // );
})
gulp.task('min-css', function(){
  return gulp.src(MIN_SRC.css)
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(MIN_DEST.css));
})
gulp.task('min-html', function(){
  return gulp.src(TMP_SRC.pages)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(MIN_DEST.pages))
})

gulp.task('build', function () {
  runSequence('clean', 'useref', 'copy', 'rev-hash-js', 'rev-hash-css', 'rev-html-replace', 'min-js', 'min-css', 'min-html');
})
