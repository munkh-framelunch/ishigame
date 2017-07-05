import gulp from 'gulp';
import gulpif from 'gulp-if';
import runSequence from 'run-sequence';

import conf from '../config';

gulp.task('dev', cb => runSequence(
  'clean',
  ['view', 'style', 'script'],
  'server',
  cb,
));

gulp.task('default', ['dev'], () => {
  gulp.watch(conf.view.watch, ['view']);
  gulp.watch(conf.style.watch, ['style']);
  gulp.watch(conf.script.watch, ['script']);
});

gulp.task('build', cb => conf.rev.isEnable ?
  runSequence(
    'b.clean',
    ['b.view', 'b.style', 'b.script'],
    ['copy.static', 'copy.assets'],
    'rev',
    'rev.replace',
    cb
  ) :
  runSequence(
    'b.clean',
    ['b.view', 'b.style', 'b.script'],
    ['copy.static', 'copy.assets'],
    cb
  )
);
