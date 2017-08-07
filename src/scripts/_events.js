import $ from 'jquery';

import notice from 'libraries-frontend-framelunch/js/notice';

const $window = $(window);

export function subscribeOnScrollEvent({ intervalMSec } = { intervalMSec: 50 }) {
  let lastTopPosition = 0;
  let timerId;
  $window.on('scroll', () => {
    const top = $window.scrollTop();
    lastTopPosition = top;
    if (top !== 0) {
      notice.publish('scroll', [top]);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        notice.publish('scrollInterval', [lastTopPosition]);
      }, intervalMSec);
    } else {
      setTimeout(() => {
        notice.publish('scroll', [lastTopPosition]);
        notice.publish('scrollInterval', [lastTopPosition]);
      }, 100);
    }
  });
  notice.publish('scroll', [$window.scrollTop()]);
  notice.publish('scrollInterval', [$window.scrollTop()]);
}

export function subscribeOnResizeEvent({ intervalMSec } = { intervalMSec: 300 }) {
  let timerID;

  $window.on('resize', () => {
    clearTimeout(timerID);
    timerID = setTimeout(() => notice.publish('resize', [$window]), intervalMSec);
  });
  notice.publish('resize', [$window]);
}

export default function subscriveEvents() {
  subscribeOnScrollEvent();
  subscribeOnResizeEvent();
}
