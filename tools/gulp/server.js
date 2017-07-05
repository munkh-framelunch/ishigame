import gulp from 'gulp';
import browser from 'browser-sync';

import conf from '../config';

gulp.task('server', () => browser.init(null, conf.browser));

