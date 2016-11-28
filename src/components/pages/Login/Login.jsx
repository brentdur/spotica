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

    // Are username & password not blank?
    if (this.username.isBlank()) {
      this.username.addError();
      errors.push('The username field is blank.');
    }

    if (this.password.isBlank()) {
      this.password.addError();
      errors.push('The password field is blank.')
    }

    if (!inLoginMode) {
      // Is the password 8 characters or longer?
      if (this.confirmPassword.value().length < 8) {
        this.confirmPassword.addError();
        errors.push('Your password needs to be at least 8 characters long.');
      }

      // Is confirm password blank?
      if (this.confirmPassword.isBlank()) {
        this.confirmPassword.addError();
        errors.push('The confirm password field is blank.');
      }

      // Do the passwords match?
      if (this.confirmPassword.value() !== this.password.value()) {
        this.confirmPassword.addError();
        errors.push('The password and password confirmation fields don\'t match.');
      }
    }

    if (errors.length === 0) {
      // Login
      this.props.history.push('/');
    }

    // Display the errors
    this.setState({ errors: errors });
  },

  render() {
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
          className="login__username"
          onEnter={this.logIn}
          focus />

        <Input
          ref={ref => this.password = ref}
          className="login__password"
          label="Password"
          type="password"
          name="password"
          note="Must be 8 characters or longer."
          onEnter={this.logIn} />

        <Input
          ref={ref => this.confirmPassword = ref}
          className="hidden login__confirmPassword"
          label="Confirm password"
          type="password"
          name="confirm_password"
          onEnter={this.logIn}/>

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
