import React from 'react';

import './style.scss';

const Section = React.createClass({
  render() {
    var className = 'section';

    if (this.props.narrow) {
      className = 'section-narrow ' + className;
    }

    return (
      <section className={className}>
        {this.props.children}
      </section>
    );
  }
});

export default Section;
