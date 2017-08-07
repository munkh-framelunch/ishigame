import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPosition from '../position';

const section = $('#sec4');
let status = 0;

notice.listen('scroll', (scrollTop) => {
  if (getPosition(section) === 0 && status === 0) {
    status = 1;
  }
  if (getPosition(section) !== 0) {
    status = 0;
  }
});
