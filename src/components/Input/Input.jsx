import React from 'react';

import './style.scss';

const Input = React.createClass({
  render() {
    return (
      <input ...this.props />
    );
  }
});

export default Input;
