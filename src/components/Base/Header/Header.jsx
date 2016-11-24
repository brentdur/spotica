import React from 'react';

import Icon from '../../Icon/Icon';

import './style.scss';

const Header = React.createClass({
  render() {
    return (
      <header className="header">
        <div className="header__container">
          <span className="logo">
            <Icon className="logo__icon">music_note</Icon>
            <h1 className="logo__title">Spotica</h1>
          </span>
          <span>
            <Icon className="header__icon">equalizer</Icon>
            <Icon className="header__icon">settings</Icon>
          </span>
        </div>
      </header>
    );
  }
});

export default Header;
