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
    var className = 'button';

    if (this.props.className) {
      className = this.props.className + ' button';
    }

    if (this.props.compact) {
      className = 'button-compact ' + className;
    }

    if (this.props.adaptive) {
      className = 'button-adaptive ' + className;
    }

    return (
      <button
        ref={ref => this.button = ref}
        className={className}>
        {this.generateIcon()}
        {this.props.children}
      </button>
    );
  }
});

export default Button;
