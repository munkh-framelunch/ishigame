import $ from 'jquery';
import notice from '../libs/notice';

const $window = $(window);

function scroll() {
  let a = 0;
  $window.on('scroll', () => {
    const top = $window.scrollTop();
    a = top;
    if (top !== 0) {
      notice.publish('scroll', [top]);
    } else {
      setTimeout(() => {
        if (a === 0) {
          notice.publish('scroll', [a]);
        }
      }, 100);
    }
  });
  notice.publish('scroll', [$window.scrollTop()]);
}

function resize() {
  let time;
  $window.on('resize', () => {
    clearTimeout(time);
    time = setTimeout(() => {
      notice.publish('resize', [$window]);
    }, 300);
  });
  notice.publish('resize', [$window]);
}

export default () => {
  scroll();
  resize();
};
