import React from 'react';
import cookie from 'react-cookie';

const DjangoCsrfToken = React.createClass({
  value() {
    return this.value;
  },

  render() {
    this.value = document.querySelector('[name="csrfmiddlewaretoken"]').value;

    return (
      <input
        type="hidden"
        name="csrfmiddlewaretoken"
        value={this.value} />
    );
  }
});

export default DjangoCsrfToken;
