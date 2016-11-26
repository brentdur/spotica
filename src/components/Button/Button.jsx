import React from 'react';

import Icon from '../Icon/Icon';

import './style.scss';

const Button = React.createClass({
  componentDidMount() {
    if (this.props.onClick) {
      this.button.addEventListener('click', this.props.onClick);
    }
  },

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
      <button
        ref={ref => this.button = ref}
        className={classes}>
        {this.generateIcon()}
        {this.props.children}
      </button>
    );
  }
});

export default Button;
