import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import conf from '../config';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#sec6');
const title = $('.title-6');
const titleBg = $('.title_bg-6');
let begin = 0;
const moveTitle = new MovingTitle(titleBg);
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
