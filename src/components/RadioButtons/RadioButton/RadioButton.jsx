import React from 'react';

import './style.scss';

const RadioButton = React.createClass({
  componentDidMount() {
    if (this.props.onClick) {
      this.button.addEventListener('click', this.props.onClick);
    }
  },

  render() {
    console.log(this.props.children);

    return (
      <div className="radioButton">
        <input
          ref={ref => this.button = ref}
          className="radioButton__field"
          type="radio"
          name={this.props.name || ''}
          value={this.props.value}
          selected={this.props.selected || false} />
        <label
          className="radioButton__label"
          htmlFor={this.props.name}>
          {this.props.children}
        </label>
      </div>
    );
  }
});

export default RadioButton;
