import $ from 'jquery';

let focused = true;
$(window).focus(() => {
  focused = true;
});

$(window).blur(() => {
  focused = false;
});
export default class movingTitle {
  constructor(item) {
    this.title = item;
    this.speed = 20;
    this.moveX = 0;
  }
  move() {
    if (focused) {
      this.moveX += this.speed;
      this.title.css({
        backgroundPosition: `${this.moveX}px 0`,
      });
    }
  }
  start() {
    this.timer = setTimeout(() => {
      this.move();
      this.start();
    }, 1000);
  }
  stop() {
    clearTimeout(this.timer);
  }
}
