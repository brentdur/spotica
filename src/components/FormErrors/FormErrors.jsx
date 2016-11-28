import React from 'react';

import './style.scss';

const FormErrors = React.createClass({
  render() {
    if (this.props.errors.length === 0) {
      return <div></div>;
    }

    return (
      <div className="formErrors">
        <p className="formErrors__prompt">Your form has the following errors:</p>

        <ul
          className="formErrors__list">
          {this.props.errors.map((error, i) => {
            return (
              <li
                key={i}
                className="formErrors__error">
                {error}
              </li>
            );
          })}
        </ul>

        <p className="formErrors__prompt">Please fix them and try again.</p>
      </div>
    );
  }
});

export default FormErrors;
