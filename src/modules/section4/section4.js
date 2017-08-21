import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#sec4');
const title = $('.title-4');
const titleBg = $('.title_bg-4');
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
