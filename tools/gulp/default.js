import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import runSequence from 'run-sequence';
import conf from '../config';

gulp.task('dev', cb => (
  runSequence(
    'clean',
    ['ejs', 'style', 'script'],
    'server',
    cb,
  )
));

gulp.task('default', ['dev'], () => {
  gulp.watch(conf.watch.ejs, ['ejs']);
  gulp.watch(conf.watch.style, ['style']);
  gulp.watch(conf.watch.script, ['script']);
});

gulp.task('copy.assets', function () {
  return gulp.src(conf.copy.assets)
    .pipe(gulpif('*.{png,jpg,gif}', imagemin()))
    .pipe(gulp.dest(`${conf.dest.build}/assets`));
});
gulp.task('build', function (cb) {
  return runSequence(
    'b.clean',
    ['b.ejs', 'b.style', 'b.script'],
    'copy.assets',
    cb
  );
});
