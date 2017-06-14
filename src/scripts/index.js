import $ from 'jquery';
import touchEvents from 'jquery-touch-events';
import anime from 'animejs';
import notice from '../libs/notice';
import state from '../libs/state';
import events from './_events';

touchEvents($);

notice.listen('init', (data) => {
  console.log(data);
});
notice.publish('init', [123]);

notice.listen('resize', ($w) => {
  console.log($w.width(), $w.height());
});
notice.listen('scroll', (scrollTop) => {
  console.log(scrollTop);
});
events();

state.listen('add:a', (v) => {
  console.log('add:a', v);
});
state.listen('add:c', (v) => {
  console.log('add:c', v);
});
state.change('a/b/c', [5678]);

console.log($('#test-img'));

anime({
  targets: '#test-img',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 },
  ],
  rotate: '1turn',
  backgroundColor: '#00ff00',
  duration: 2000,
  loop: false,
});
