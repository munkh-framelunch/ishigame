import gulp from 'gulp';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';

import conf from '../config';

const manifest = gulp.src(`${conf.rev.dest}/${conf.rev.manifestFileName}`);

gulp.task('rev', () => gulp.src(conf.rev.src)
  .pipe(rev())
  .pipe(gulp.dest(conf.rev.dest))
  .pipe(rev.manifest(conf.rev.manifestFileName))
  .pipe(gulp.dest(conf.rev.dest))
);

gulp.task('rev.replace', () => gulp.src(conf.revReplace.src)
  .pipe(revReplace({ manifest }))
  .pipe(gulp.dest(conf.revReplace.dest))
);
