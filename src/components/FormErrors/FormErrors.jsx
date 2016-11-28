import React from 'react';

import './style.scss';

const FormErrors = React.createClass({
  render() {
    if (this.props.errors.length === 0) {
      return <div></div>;
    }

    return (
      <div>
        <p>Your form has the following errors:</p>

        <ul>
          {this.props.errors.map((error, i) => {
            return (
              <li key={i}>{error}</li>
            );
          })}
        </ul>

        <p>Please fix them and resubmit the form.</p>
      </div>
    );
  }
});

export default FormErrors;
