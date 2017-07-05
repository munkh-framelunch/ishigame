import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';

import conf from '../config';

gulp.task('copy.static', () => gulp.src(conf.copy.static).pipe(gulp.dest(`${conf.dest.build}`)));
gulp.task('copy.assets', () => gulp.src(conf.copy.assets)
    .pipe(gulpif('*.{png,jpg,gif}', imagemin()))
    .pipe(gulp.dest(`${conf.dest.build}/assets`))
);

