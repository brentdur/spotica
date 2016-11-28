import React from 'react';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Section from '../../Section/Section';
import RadioButtons from '../../RadioButtons/RadioButtons';

import './style.scss';

const Login = React.createClass({
  render() {
    const formOptions = [{
      text: 'I have an account',
      selected: true,
    }];

    return (
      <Section>
        <h1>Login</h1>

        <Input
          ref={ref => this.username = ref}
          label="Username"
          name="username"
          className="login__username" />

        <Input
          ref={ref => this.password = ref}
          label="Password"
          type="password"
          name="password"
          className="login__password" />

        <Input
          ref={ref => this.confirmPassword = ref}
          label="Confirm password"
          type="password"
          name="confirm_password"
          className="hidden login__confirmPassword" />

        <RadioButtons
          options={formOptions}
        />

        <Button
          ref={ref => this.submit = ref}>
          Login
        </Button>
      </Section>
    );
  }
});

export default Login;
