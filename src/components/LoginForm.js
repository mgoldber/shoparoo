import React, { Component } from 'react';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameLogin: '',
      passwordLogin: ''
    }
  }

  handleUsernameChange = (event) => {
    this.setState({
      usernameLogin: event.target.value
    });
  }

  handlePasswordChange = (event) => {
    this.setState({
      passwordLogin: event.target.value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onLoginSubmit(this.state.usernameLogin, this.state.passwordLogin);
  }

  render() {
    return (
      <div className="Auth__Component">
        <h4>Sign In</h4>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Username
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            id="usernameLogin"
            value={this.state.usernameLogin}
            onChange={this.handleUsernameChange}
          />
          <label>
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            id="passwordLogin"
            value={this.state.passwordLogin}
            onChange={this.handlePasswordChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }

}

export default LoginForm;