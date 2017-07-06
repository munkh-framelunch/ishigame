import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import customProperties from 'postcss-custom-properties';
import nested from 'postcss-nested';
import importCss from 'postcss-import';
import customMedia from 'postcss-custom-media';
import cssFixes from 'postcss-fixes';
import url from 'postcss-url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browser from 'browser-sync';

import conf from '../config';

gulp.task('style', () => (
  gulp.src(conf.style.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      importCss,
      customProperties,
      customMedia,
      nested,
      cssFixes,
      url(conf.style.urlOption),
      autoprefixer(conf.style.autoprefixerOption)
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${conf.dest.dev}/css`))
    .pipe(browser.reload({ stream: true }))
));

gulp.task('b.style', () => (
  gulp.src(conf.style.src)
    .pipe(postcss([
      importCss,
      customProperties,
      customMedia,
      nested,
      cssFixes,
      autoprefixer(conf.style.autoprefixerOption),
      cssnano,
    ]))
    .pipe(gulp.dest(`${conf.dest.build}/css`))
));
