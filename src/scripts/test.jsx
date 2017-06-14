import $ from 'jquery';
import anime from 'animejs';
import { store, actions } from './_store';

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actions.initialize({ test: 99999 }));
store.dispatch(actions.awake());

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
