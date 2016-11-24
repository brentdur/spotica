import React from 'react';

import './style.scss';

const Icon = React.createClass({
  render() {
    var className = 'material-icons';

    if (this.props.className) {
      className = this.props.className + ' material-icons';
    }

    if (this.props.color) {
      className = 'icon-' + this.props.color + ' ' + className;
    }

    return (
      <i className={className}>{this.props.children}</i>
    );
  }
});

export default Icon;
