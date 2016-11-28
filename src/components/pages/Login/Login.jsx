import React from 'react';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Section from '../../Section/Section';
import FormErrors from '../../FormErrors/FormErrors';
import RadioButtons from '../../RadioButtons/RadioButtons';

import './style.scss';

const Login = React.createClass({
  getInitialState() {
    return { errors: [] };
  },

  componentDidMount() {
    this.signupToggle.addEventListener('click', this.toggleSignup);
  },

  toggleSignup(e) {
    e.preventDefault();

    const inLoginMode = this.confirmPassword.isHidden();

    if (inLoginMode) {
      // Switch to signup mode
      this.confirmPassword.show();
      this.signupToggle.textContent = 'I already have an account.';
    } else {
      // Switch to login mode
      this.confirmPassword.hide();
      this.signupToggle.textContent = 'I don\'t have an account yet.';
    }
  },

  logIn(e) {
    // Are they logging in or signing up?
    const inLoginMode = this.confirmPassword.isHidden();
    const errors = [];

    // General confirmations

    // Are username & password not blank?
    if (this.username.isBlank()) {
      console.log('Username is blank')
      errors.push('The username field is blank.');
    }

    if (this.password.isBlank()) {
      errors.push('The password field is blank.')
    }

    if (inLoginMode) {
    } else {
      // Is confirm password blank?
      if (this.confirmPassword.isBlank()) {
        errors.push('The confirm password field is blank.');
      }

      // Do the passwords match?
      if (this.confirmPassword.value() !== this.password.value()) {
        errors.push('The password and password confirmation fields don\'t match.');
      }
    }

    this.setState({ errors: errors });
    console.log(errors);

    // Login
  },

  render() {
    const formOptions = [{
      text: 'I have an account',
      checked: true,
    }, {
      text: 'I\'m a new user',
    }];

    return (
      <Section
        narrow>
        <h1>Login</h1>

        <FormErrors
          errors={this.state.errors} />

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
          note="Must be 8 characters or longer."
          className="login__password" />

        <Input
          ref={ref => this.confirmPassword = ref}
          label="Confirm password"
          type="password"
          name="confirm_password"
          className="hidden login__confirmPassword" />

        <a
          ref={ref => this.signupToggle = ref}
          href="">I don't have an account yet.</a>

        <Button
          ref={ref => this.submit = ref}
          className="login__submit"
          onClick={this.logIn}
          adaptive>
          Login
        </Button>
      </Section>
    );
  }
});

export default Login;
