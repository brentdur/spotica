import React from 'react';

import './style.scss';

const Input = React.createClass({
  render() {
    var className = 'input';

    if (this.props.className) {
      className = this.props.className + ' ' + className;
    }

    return (
      <div className={className}>
        <label
          className="input__label"
          htmlFor={this.props.name || ''}>
          {this.props.label}
        </label>

        <input
          placeholder={this.props.placeholder || this.props.label || ''}
          name={this.props.name || ''}
          type={this.props.type || 'text'} />
      </div>
    );
  }
});

export default Input;
