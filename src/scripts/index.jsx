import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import anime from 'animejs';
import Rx from 'rx-lite';
import MainVisual from '../components/MainVisual/MainVisual';

/* With an observer */
const observer = Rx.Observer.create(
  (x) => {
    console.log('Next: %s', x);
  },
  (err) => {
    console.log('Error: %s', err);
  },
  () => {
    console.log('Completed');
  });

const source = Rx.Observable.range(0, 3);
source.subscribe(observer);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

ReactDOM.render((
  <BrowserRouter>
    <div id="content">
      <MainVisual name="abdfgkda" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </BrowserRouter>
), document.getElementById('app'));

anime({
  targets: '#content',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 },
  ],
  rotate: '1turn',
  backgroundColor: '#00ff00',
  duration: 2000,
  loop: false,
});
