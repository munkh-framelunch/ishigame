export default {
  dest: {
    dev: '.tmp',
    build: 'build',
  },

  copy: {
    assets: ['src/assets/**/*'],
  },

  ejs: {
    src: ['src/views/**/*.ejs', '!src/views/**/_*'],
    rename(path) {
      if (path.basename !== 'index') {
        let basename = 'index';
        let dirname = `${path.dirname}/`;

        dirname += path.basename.split('.').reduce((str, item) => {
          if (item.charAt(0) === '_') {
            basename = item.substr(1);
          } else {
            str += `${item}/`;
          }
          return str;
        }, '');

        path.basename = basename;
        path.dirname = dirname;
      }
    },
  },

  style: {
    src: ['src/styles/**/*', '!src/styles/**/_*'],
  },

  script: {
    src: ['src/scripts/**/*', '!src/scripts/**/_*'],
  },

  watch: {
    ejs: ['src/views/**/*.ejs'],
    style: ['src/styles/**/*.css'],
    script: ['src/scripts/**/*', 'src/components/**/*']
  },

  browser: {
    notify: false,
    port: 9012,
    server: {
      baseDir: ['.tmp'],
      routes: {
        '/assets': 'src/assets'
      },
    },
  },
};
