export default {
  dest: {
    dev: '.tmp',
    build: 'build',
  },

  copy: {
    static: ['src/*.*'],
    assets: ['src/assets/**/*'],
  },

  view: {
    src: ['src/views/**/*.ejs', '!src/views/**/_*'],
    watch: ['src/views/**/*.ejs', 'src/modules/**/*.ejs'],
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
    src: ['src/styles/**/*.css', '!src/styles/**/_*'],
    watch: ['src/styles/**/*.css', 'src/modules/**/*.css']
  },

  script: {
    src: ['src/scripts/**/*.{js,jsx}', '!src/scripts/**/_*'],
    watch: ['src/scripts/**/*', 'src/components/**/*', 'src/modules/**/*.{js,jsx}']
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
