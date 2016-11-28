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

  componentDidMount() {
    this.field.addEventListener('keyup', (e) => {
      // Remove errors
      this.input.classList.remove('input-error');

      if (e.keyCode === 13 && this.props.onEnter) {
        this.props.onEnter(e);
      }
    });

    // Should we focus on this field first?
    if (this.props.focus) this.field.focus();
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

  addError() {
    if (this.input.classList.contains('input-error')) {
      return;
    }

    this.input.classList.add('input-error');
  },

  removeError() {
    this.input.classList.remove('input-error');
  },

  value() {
    return this.field.value;
  },

  isBlank() {
    return !this.field.value;
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
          ref={ref => this.field = ref}
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
