import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import rimraf from 'rimraf';
import browser from 'browser-sync';
import runSequence from 'run-sequence';
import conf from '../config';

gulp.task('clean', cb => rimraf(conf.dest.dev, {}, cb));
gulp.task('b.clean', cb => rimraf(conf.dest.build, {}, cb));
gulp.task('copy.assets', function () {
  return gulp.src(conf.copy.assets)
    .pipe(gulpif('*.{png,jpg,gif}', imagemin()))
    .pipe(gulp.dest(`${conf.dest.build}/assets`));
});
gulp.task('server', () => (
  browser.init(null, conf.browser)
));

gulp.task('dev', cb => (
  runSequence(
    'clean',
    ['view', 'style', 'script'],
    'server',
    cb,
  )
));

gulp.task('default', ['dev'], () => {
  gulp.watch(conf.view.watch, ['view']);
  gulp.watch(conf.style.watch, ['style']);
  gulp.watch(conf.script.watch, ['script']);
});

gulp.task('build', function (cb) {
  return runSequence(
    'b.clean',
    ['b.view', 'b.style', 'b.script'],
    'copy.assets',
    cb
  );
});
