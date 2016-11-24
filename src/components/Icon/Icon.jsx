import React from 'react';

import './style.scss';

const Icon = React.createClass({
  render() {
    var className;

    if (this.props.className) className = this.props.className + ' material-icons';
    else className = 'material-icons';

    return (
      <i className={className}>{this.props.children}</i>
    );
  }
});

export default Icon;
