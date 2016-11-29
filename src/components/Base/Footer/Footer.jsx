import React from 'react';

import './style.scss';

const Footer = React.createClass({
  render() {
    return (
      <footer className="footer">
        <a
          ref={ref => this.logout = ref}
          href="/logout">
          Logout
        </a>
      </footer>
    );
  }
});

export default Footer;
