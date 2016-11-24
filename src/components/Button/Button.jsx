import React from 'react';

import Icon from '../Icon/Icon';

import './style.scss';

const Button = React.createClass({
  generateIcon() {
    if (!this.props.icon) return;

    return (
      <Icon
        className="button__icon"
        color={this.props.iconColor}>
        {this.props.icon}
      </Icon>
    );
  },

  render() {
    var classes = 'button';

    if (this.props.className) {
      classes = this.props.className + ' button';
    }

    return (
      <button className={classes}>
        {this.generateIcon()}
        {this.props.children}
      </button>
    );
  }
});

export default Button;
