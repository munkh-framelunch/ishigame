import gulp from 'gulp';
import rimraf from 'rimraf';

import conf from '../config';

gulp.task('clean', cb => rimraf(conf.dest.dev, {}, cb));
gulp.task('b.clean', cb => rimraf(conf.dest.build, {}, cb));

