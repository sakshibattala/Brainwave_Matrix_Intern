// SignUp.js
import { Component } from "react";
import { Link } from "react-router-dom";

import Context from "../../context/Context";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./signup.css";

class SignUp extends Component {
  state = {
    usersData: [],
    emailId: "",
    password: "",
    isPasswordShown: false,
    errorMsg: "",
  };

  handleHideOrShowPassword = () =>
    this.setState((prevState) => ({
      isPasswordShown: !prevState.isPasswordShown,
    }));

  onEnterEmailId = (event) => this.setState({ emailId: event.target.value });

  onEnterPassword = (event) => this.setState({ password: event.target.value });

  handleSignUp = (event) => {
    event.preventDefault();

    const { emailId, password } = this.state;
    const newUser = { emailId, password };
    const usersData = localStorage.getItem("users");
    const existingUsers = usersData ? JSON.parse(usersData) : [];

    const match = existingUsers.find((user) => user.emailId === emailId);

    if (match) {
      this.setState({
        showErrorMsg: true,
        emailId: "",
        password: "",
        errorMsg: "*User already exists",
      });
    } else {
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      this.setState({
        errorMsg: "Account created! Please Login.",
        emailId: "",
        password: "",
      });
    }
  };

  render() {
    const { isPasswordShown, emailId, password, errorMsg } = this.state;

    return (
      <div className="signup-page-outer-container">
        <Context.Consumer>
          {(value) => {
            const { darkTheme } = value;
            return (
              <div className="signup-page-container">
                <div
                  className={
                    darkTheme
                      ? "signup-form-container"
                      : "signup-form-light-container"
                  }
                >
                  <h2>Create Account</h2>
                  <form onSubmit={this.handleSignUp}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        onChange={this.onEnterEmailId}
                        value={emailId}
                        className={
                          darkTheme ? "dark-email-input" : "light-email-input"
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <div
                        className={
                          darkTheme
                            ? "password-dark-container"
                            : "password-light-container"
                        }
                      >
                        <input
                          id="password"
                          type={isPasswordShown ? "text" : "password"}
                          placeholder="Create a password"
                          required
                          onChange={this.onEnterPassword}
                          value={password}
                          className={
                            darkTheme
                              ? "dark-password-input"
                              : "light-password-input"
                          }
                        />
                        <span
                          className="password-icon"
                          onClick={this.handleHideOrShowPassword}
                        >
                          {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={
                        darkTheme ? "signup-button" : "signup-light-button"
                      }
                    >
                      Sign Up
                    </button>
                    <p className="error-msg">{errorMsg}</p>
                  </form>
                  <p className="login-link">
                    Already have an account?
                    <Link
                      to="/"
                      className={darkTheme ? "login-text" : "login-light-text"}
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            );
          }}
        </Context.Consumer>
      </div>
    );
  }
}

export default SignUp;
