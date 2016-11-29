import React from 'react';
import cookie from 'react-cookie';

const DjangoCsrfToken = React.createClass({
  value() {
    return cookie.load('csrftoken');
  },

  render() {
    return (
      <input
        type="hidden"
        name="csrfmiddlewaretoken"
        value={cookie.load('csrftoken')} />
    );
  }
});

export default DjangoCsrfToken;
