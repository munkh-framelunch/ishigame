import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPostion from '../position';

const navigation = $('#navigation');
const navItem = $('.navigation_item');
const sections = $('.section');
const menuButton = $('.menu_button');
let opened = false;
let openAnimation = false;
let arr = [];
const disableScroll = () => {
  $('body').on('wheel mousewheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
};
const enableScroll = () => {
  $('body').unbind('wheel mousewheel');
};
const openMenu = () => {
  navigation.addClass('show');
  menuButton.addClass('opened');
  opened = true;
};
const closeMenu = () => {
  navigation.removeClass('show');
  menuButton.removeClass('opened');
  opened = false;
};
const selectNavigation = (index) => {
  navItem.removeClass('selected');
  if (index !== 0) {
    navItem.eq(index - 1).addClass('selected');
  }
};
notice.listen('scrollInterval', () => {
  sections.each((index, item) => {
    const itemPos = getPostion($(item));
    if (itemPos.pos === 0) {
      arr.push({
        index,
        inValue: itemPos.inValue,
      });
    }
  });
  arr.sort((a, b) => b.inValue - a.inValue);
  selectNavigation(arr[0].index);
  arr = [];
});
notice.listen('init', () => {
  navigation.find('a').on('click', (event) => {
    selectNavigation(navigation.find('a').index(event.currentTarget) + 1);
    closeMenu();
  });
  menuButton.on('click', () => {
    if (!openAnimation) {
      openAnimation = true;
      if (!opened) {
        openMenu();
      } else {
        closeMenu();
      }
      setTimeout(() => {
        openAnimation = false;
      }, 400);
    }
  });
});
