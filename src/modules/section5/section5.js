import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#sec5');
const title = $('.title-5');
const titleBg = $('.title_bg-5');
let begin = 0;
const moveTitle = new MovingTitle(titleBg);
const fixNumber = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};
class Slide {
  constructor() {
    this.length = 9;
    this.thumb = $('.thumb_box');
    this.thumbItem = $('.thumb_item');
    this.bigImage = $('#bigImage');
    this.currentIndex = $('#currentIndex');
    this.current = 1;
    this.next = $('#next');
    this.prev = $('#prev');
    this.isMoving = false;
    this.array = [6, 7, 8, 9, 1, 2, 3, 4, 5];
    this.speed = 400;
  }
  showBigImage(canChange) {
    if (canChange) {
      let src = this.bigImage.attr('src');
      /*
       this.bigImage.animate({
       opacity: '0.5',
       }, this.speed / 2, 'linear', () => {
       this.bigImage.animate({
       opacity: 1,
       }, this.speed / 2, 'linear');
       });
       */
      const beginIndex = src.indexOf('_');
      const lastIndex = src.indexOf('.jpg');
      src = `${src.substr(0, beginIndex)}_${fixNumber(this.current)}${src.substr(lastIndex, src.length - 1)}`;
      this.bigImage.attr('src', src);
      this.currentIndex.html(fixNumber(this.current));
    }
  }
  moveNext(speed, changeBig) {
    this.isMoving = true;
    $('.thumb_box').animate({
      left: '-11.32%',
    }, speed, 'linear', () => {
      this.array.shift();
      const lastItem = this.array[this.array.length - 1];
      if (lastItem < this.length) {
        this.array.push(lastItem + 1);
      } else {
        this.array.push(1);
      }
      if (this.current < this.length) {
        this.current += 1;
      } else {
        this.current = 1;
      }
      $('.thumb_item').eq(0).remove();
      $('.thumb_box').append(`
        <div class="thumb_item"><img src="/assets/image/gallery/tmb_${fixNumber(this.array[this.array.length - 1])}.jpg"></div>
      `);
      $('.thumb_box').css({
        left: '0',
      });
      this.isMoving = false;
      this.showBigImage(changeBig);
    });
  }
  movePrev(speed, changeBig) {
    this.isMoving = true;
    $('.thumb_box').animate({
      left: '11.32%',
    }, speed, 'linear', () => {
      this.array.pop();
      const firstItem = this.array[0];
      if (firstItem > 1) {
        this.array.unshift(firstItem - 1);
      } else {
        this.array.unshift(this.length);
      }
      if (this.current > 1) {
        this.current -= 1;
      } else {
        this.current = this.length;
      }
      $('.thumb_item').eq(8).remove();
      $('.thumb_box').prepend(`
        <div class="thumb_item"><img src="/assets/image/gallery/tmb_0${this.array[0]}.jpg"></div>
      `);
      $('.thumb_box').css({
        left: '0',
      });
      this.isMoving = false;
      this.showBigImage(changeBig);
    });
  }
  init() {
    this.prev.on('click', () => {
      if (!this.isMoving) {
        this.movePrev(this.speed, true);
      }
    });
    this.next.on('click', () => {
      if (!this.isMoving) {
        this.moveNext(this.speed, true);
      }
    });
    this.thumb.on('click', (current) => {
      if (current.target.nodeName === 'IMG') {
        const goTo = $(current.target.parentNode).index();
        const midIndex = 4;
        if (goTo !== midIndex) {
          if (goTo < midIndex) {
            const speed = this.speed / (midIndex - goTo);
            for (let i = goTo; i < midIndex; i += 1) {
              let canChange = true;
              if (i < midIndex - 1) { canChange = false; }
              this.movePrev(speed, canChange);
            }
          }
          if (goTo > midIndex) {
            const speed = this.speed / (goTo - midIndex);
            for (let i = midIndex; i < goTo; i += 1) {
              let canChange = true;
              if (i < goTo - 1) { canChange = false; }
              this.moveNext(speed, canChange);
            }
          }
        }
      }
    });
  }
}
notice.listen('init', () => {
  const slider = new Slide();
  slider.init();
});
notice.listen('scroll', (scrollTop) => {
  const pos = getPosition(section);
  const currentPosition = section.offset().top;
  const wHeight = $(window).height();
  if (pos.pos === 0) {
    if (begin === 0) {
      moveTitle.move();
      moveTitle.start();
    }
    if (scrollTop > currentPosition - (wHeight * 0.5)) {
      title.removeClass('hide');
    }
    begin = 1;
  } else {
    moveTitle.stop();
    begin = 0;
  }
});
