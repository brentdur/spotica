import React from 'react';

import './style.scss';

const Section = React.createClass({
  generateTitle() {
    if (!this.props.title) return;

    return (
      <h1
        className="section__title">
        {this.props.title}
      </h1>
    );
  },

  render() {
    var className = 'section';

    if (this.props.narrow) {
      className = 'section-narrow ' + className;
    }

    return (
      <section className={className}>
        {this.generateTitle()}
        {this.props.children}
      </section>
    );
  }
});

export default Section;
