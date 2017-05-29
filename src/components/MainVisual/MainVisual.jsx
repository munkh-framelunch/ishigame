import React from 'react';
import PropTypes from 'prop-types';

import style from './MainVisual.css';
import clickSvg from './assets/click.svg';
import iconPng from './assets/icon.png';

export default class MainVisual extends React.Component {
  constructor(props) {
    super(props);
    console.log(123);
  }
  render() {
    return (
      <div className={style.header}>
        <p>{this.props.name}</p>
        <p>2016 - {new Date().getFullYear()}</p>
        <img src={clickSvg} alt="test" />
        <img src={iconPng} alt="test" />
      </div>
    );
  }
}
MainVisual.propTypes = {
  name: PropTypes.string.isRequired,
};
MainVisual.defaultProps = {
  name: 'test',
};
