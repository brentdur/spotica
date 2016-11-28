import React from 'react';

import RadioButton from './RadioButton/RadioButton';

import './style.scss';

const RadioButtons = React.createClass({
  render() {
    const buttons = this.props.options || [];
    return (
      <div className="radioButtons">
        {buttons.map((button, i) => {
          return (
            <RadioButton
              onClick={button.action}
              name={this.props.name}
              value={button.value}
              selected={button.selected}
              key={i}>
              {button.text}
            </RadioButton>
          );
        })}
      </div>
    );
  }
});

export default RadioButtons;
