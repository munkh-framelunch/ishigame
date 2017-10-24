import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#sec1');
const title = $('.title-1');
const titleBg = $('.title_bg-1');
const image = $('.section-1_image');
let begin = 0;
const moveTitle = new MovingTitle(titleBg);
notice.listen('scroll', (scrollTop) => {
  const pos = getPosition(section);
  const currentPosition = section.offset().top;
  if (pos.pos === 0 && begin === 0) {
    moveTitle.move();
    moveTitle.start();
    begin = 1;
  }
  if (pos.pos !== 0) {
    moveTitle.stop();
    begin = 0;
  }
  if (scrollTop >= currentPosition) {
    title.removeClass('hide');
    image.removeClass('hide');
  }
});
