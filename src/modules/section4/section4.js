import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#sec4');
const title = $('.title-4');
const titleBg = $('.title_bg-4');
const interview = $('.interview');
const item = $('.interview_item');
const itemButton = $('.interview_bottom_item');
const modalButton = $('.staff_item');

const disableScroll = () => {
  $('body').css({
    overflow: 'hidden',
  });
};

const enableScroll = () => {
  $('body').css({
    overflow: 'auto',
  });
};

const showItem = (index) => {
  itemButton.removeClass('selected');
  itemButton.eq(index).addClass('selected');
  item.hide();
  item.eq(index).fadeIn();
  interview.scrollTop(0);
};

const showModal = (index) => {
  disableScroll();
  interview.fadeIn();
  showItem(index);
};

const hideModal = () => {
  enableScroll();
  interview.fadeOut();
};

notice.listen('init', () => {
  modalButton.on('click', (e) => {
    const current = $(e.currentTarget);
    showModal(current.index());
  });
  itemButton.on('click', (e) => {
    const current = $(e.currentTarget);
    showItem(current.index());
  });
  $('.interview_bg').on('click', () => {
    hideModal();
  });
  $('.close_interview').on('click', () => {
    hideModal();
  });
});
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
