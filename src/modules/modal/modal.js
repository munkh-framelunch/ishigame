import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

const $modal = $('.modal_fixed');
const $content = $('.modal_content');
const showModal = (id) => {
  const modal = $(id).show();
  modal.show();
  modal.animate({
    opacity: 1,
  }, 400);
};
const hideModal = () => {
  $modal.animate({
    opacity: 0,
  }, 400, () => {
    $modal.hide();
  });
};
notice.listen('init', () => {
  $modal.hide();
  $('.modal_bg, .modal_close').on('click', () => {
    hideModal();
  });
});
notice.listen('showModal', (id) => {
  showModal(id);
});
notice.listen('hideModal', () => {
  hideModal();
});
