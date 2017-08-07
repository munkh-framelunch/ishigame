import $ from 'jquery';

const $window = $(window);

export default function getPosition($item) {
  const top = $item.offset().top;
  const bottom = top + $item.height() - 10;
  const windowTop = $window.scrollTop();
  const windowBottom = windowTop + $window.height();
  let pos = -1;
  let inValue = 0;
  let inHeight = 0;
  if (windowBottom > top) {
    pos = 0;
    inValue = 1;
    if (top > windowTop) {
      inHeight = windowBottom - top;
      if (inHeight > $item.height()) inHeight = $item.height();
      inValue = inHeight / $window.height();
    } else if (windowBottom > bottom) {
      inHeight = bottom - windowTop;
      if (inHeight > $item.height()) inHeight = $item.height();
      inValue = inHeight / $window.height();
    }

    if (windowTop > bottom) {
      pos = 1;
      inValue = 0;
    }
  } else {
    pos = -1;
    inValue = 0;
  }
  return {
    pos,
    inValue,
  };
}
