import 'babel-polyfill';  // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import $ from 'jquery';
import touchEvents from 'jquery-touch-events';
import anime from 'animejs';

import notice from 'libraries-frontend-framelunch/js/notice';
import state from 'libraries-frontend-framelunch/js/state';
import subscribeEvents from './_events';
import '../modules/modal/modal';
import '../modules/navigation/navigation';
import '../modules/section1/section1';
import '../modules/section2/section2';
import '../modules/section3/section3';
import '../modules/section4/section4';
import '../modules/section5/section5';
import '../modules/section6/section6';
import '../modules/section7/section7';
import getPosition from '../modules/position';

$.extend($.easing,
  {
    def: 'easeOutQuad',
    easeOutExpo(x, t, b, c, d) {
      return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
  });
const disableScroll = () => {
  $('body').on('wheel mousewheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
};
const enableScroll = () => {
  $('body').unbind('wheel mousewheel');
};

const goTo = (pos) => {
  disableScroll();
  notice.publish('going', [true]);
  $('body,html').animate({
    scrollTop: pos,
  }, 1000, 'easeOutExpo', () => {
    enableScroll();
    notice.publish('going', [false]);
  });
};
const section0 = $('#sec0');
const section1 = $('#sec1');
let begin = 0;
class Main {
  constructor() {
    touchEvents($);
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onScrollTop = this.onScrollTop.bind(this);
  }

  onDOMContentLoaded() {
    if ($(window).scrollTop() > $(window).height()) {
      begin = 1;
    }
    notice.publish('init', []);
    $('a').on('click', (event) => {
      const hash = $(event.currentTarget)[0].hash;
      const $elm = $(hash);
      if (hash !== '') {
        event.preventDefault();
        goTo($elm.offset().top);
      }
    });
  }

  onWindowResize($window) {
    setTimeout(() => {
      $('.load_progress_container').animate({
        width: 0,
      }, 800, () => {
        $('.load').fadeOut();
        $('body').css({
          overflow: 'auto',
        });
      });
    }, 400);
  }

  onScrollTop(scrollTop) {
    if (getPosition(section1).pos === 0 && begin === 0) {
      goTo(section1.offset().top);
      begin = 2;
      notice.listen('going', (status) => {
        if (!status) {
          begin = 1;
        }
      });
    }
    if (getPosition(section0).pos === 0 && begin === 1) {
      goTo(section0.offset().top);
      begin = 2;
      notice.listen('going', (status) => {
        if (!status) {
          begin = 0;
        }
      });
    }
  }
}
const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
notice.listen('resize', main.onWindowResize);
notice.listen('scroll', main.onScrollTop);
subscribeEvents();

/*
anime({
  targets: '#test-img',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 },
  ],
  rotate: '1turn',
  backgroundColor: [
    { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
    { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
    { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
    { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
  ],
  duration: 2000,
  loop: false,
});
*/
