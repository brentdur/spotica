import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const Base = React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

export default Base;
