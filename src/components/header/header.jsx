import React from 'react';

import style from './header.css';
import clickSvg from './assets/click.svg';
import iconPng from './assets/icon.png';

export default () => (
  <div className={style.header}>
    <p>2016 - {new Date().getFullYear()}</p>
    <img src={clickSvg} alt="test" />
    <img src={iconPng} alt="test" />
  </div>
);
