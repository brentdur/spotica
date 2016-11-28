import React from 'react';

import './style.scss';

const Input = React.createClass({
  generateLabel() {
    if (!this.props.label) return;

    return (
      <label
        className="input__label"
        htmlFor={this.props.name || ''}>
        {this.props.label}
      </label>
    );
  },

  generateNote() {
    if (!this.props.note) return;

    return (
      <p
        className="input__note">
        {this.props.note}
      </p>
    );
  },

  show() {
    this.input.classList.remove('hidden');
  },

  hide() {
    this.input.classList.add('hidden');
  },

  isHidden() {
    return this.input.classList.contains('hidden');
  },

  render() {
    var className = 'input';

    if (this.props.className) {
      className = this.props.className + ' ' + className;
    }

    return (
      <div
        ref={ref => this.input = ref}
        className={className}>
        {this.generateLabel()}

        <input
          className="input__field"
          placeholder={this.props.placeholder || this.props.label || ''}
          name={this.props.name || ''}
          type={this.props.type || 'text'} />

        {this.generateNote()}
      </div>
    );
  }
});

export default Input;
