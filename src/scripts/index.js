import $ from 'jquery';
import touchEvents from 'jquery-touch-events';
import anime from 'animejs';

import notice from '../libs/notice';
import state from '../libs/state';
import subscribeEvents from './_events';

class Main {
  constructor() {
    this.setTouchEventsToJQuery();
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onScrollTop = this.onScrollTop.bind(this);
  }

  setTouchEventsToJQuery() {
    touchEvents($);
  }

  onDOMContentLoaded() {
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
        { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 }
      ],
      duration: 2000,
      loop: false,
    });
  }

  onWindowResize($window) {
    console.log('onWindowResize:', $window.width(), $window.height());
  }

  onScrollTop(scrollTop) {
    console.log('scrollTop:', scrollTop);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);

notice.listen('init', data => console.log(data));
notice.publish('init', [123]);
notice.listen('resize', main.onWindowResize);
notice.listen('scroll', main.onScrollTop);
subscribeEvents();

state.listen('add:a', v => console.log('add:a', v));
state.listen('add:c', v => console.log('add:c', v));
state.change('a/b/c', [5678]);

