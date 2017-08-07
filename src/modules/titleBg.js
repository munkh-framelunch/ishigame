export default class movingTitle {
  constructor(item) {
    this.title = item;
    this.speed = 20;
    this.moveX = 0;
  }
  move() {
    this.moveX += this.speed;
    this.title.css({
      backgroundPosition: `${this.moveX}px 0`,
    });
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
