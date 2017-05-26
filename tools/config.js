export default {
  dest: {
    dev: '.tmp',
    build: 'build',
  },

  copy: {
    assets: ['src/assets/**/*'],
  },

  view: {
    src: ['src/views/**/*.ejs', '!src/views/**/_*'],
    watch: ['src/views/**/*.ejs'],
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
    watch: ['src/styles/**/*.css']
  },

  script: {
    src: ['src/scripts/**/*', '!src/scripts/**/_*'],
    watch: ['src/scripts/**/*', 'src/components/**/*']
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
