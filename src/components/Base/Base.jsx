import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import './style.scss';

const Base = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <main className="mainContent">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
});

export default Base;
