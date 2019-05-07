import React, { Component } from "react";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameRegister: "",
      passwordRegister: ""
    };
  }

  handleUsernameChange = event => {
    this.setState({
      usernameRegister: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      passwordRegister: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onRegisterSubmit(
      this.state.usernameRegister,
      this.state.passwordRegister
    );
  };

  render() {
    return (
      <div className="Auth__Component">
        <h4>Register</h4>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            id="usernameRegister"
            value={this.state.usernameRegister}
            onChange={this.handleUsernameChange}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            id="passwordRegister"
            value={this.state.passwordRegister}
            onChange={this.handlePasswordChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default RegisterForm;