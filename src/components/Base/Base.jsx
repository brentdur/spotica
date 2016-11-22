import React from 'react';

const Base = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export default Base;
