import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#global');
const title = $('.title-global');
const titleBg = $('.title_bg-global');
const h2 = $('.section-2_h2');
const text = section.find('.flex_text_item');
let begin = 0;
const moveTitle = new MovingTitle(titleBg);

const interview = $('.global-modal');
const button = $('.global-button');
const box = $('.global-modal-box');

const disableScroll = () => {
  $('body').css({
    overflow: 'hidden',
  });
};

const showModal = () => {
  disableScroll();
  box.hide();
  setTimeout(() => {
    box.fadeIn();
  }, 50);
  interview.fadeIn();
};

notice.listen('init', () => {
  button.on('click', () => {
    showModal();
  });
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
      h2.removeClass('hide');
    }
    if (scrollTop > currentPosition - (wHeight * 0.2)) {
      text.removeClass('hide');
    }
    begin = 1;
  } else {
    moveTitle.stop();
    begin = 0;
  }
});
