import { Component } from "react";
import Context from "../../context/Context";

// import ProtectedRoute from "../../ProtectedRoute/protectedRoute";

import { LuMoon } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import Popup from "reactjs-popup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "@fontsource/poppins";
import "./landing.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class Landing extends Component {
  state = {
    passwordShown: false,
    emailId: "",
    password: "",
    showErrorMsg: false,
    errorMsg: "",
  };

  handleHideOrShowPassword = () =>
    this.setState((prevState) => ({
      passwordShown: !prevState.passwordShown,
    }));

  onEnterEmail = (event) => this.setState({ emailId: event.target.value });

  onEnterPassword = (event) => this.setState({ password: event.target.value });

  handleLogin = (event) => {
    event.preventDefault();

    const { emailId, password } = this.state;

    const users = localStorage.getItem("users");
    const existingUsers = JSON.parse(users) || [];

    const correctCredentials = existingUsers.find(
      (user) => user.emailId === emailId && user.password === password
    );

    if (correctCredentials) {
      this.setState({ showErrorMsg: false, errorMsg: "" });
      localStorage.setItem("currentUser", emailId);
      localStorage.setItem("isAuthenticated", "true");
      const { history } = this.props;
      return history.replace("/dashboard");
    } else {
      this.setState({ showErrorMsg: true, errorMsg: "*Invalid credentials" });
    }
  };

  render() {
    const { passwordShown, errorMsg, emailId, password, showErrorMsg } =
      this.state;

    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="landing-page-outer-container">
        <Context.Consumer>
          {(value) => {
            const { darkTheme, toggleTheme } = value;

            const onChangeTheme = () => toggleTheme();

            const overLayStyle = {
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(3px)",
            };

            return (
              <div
                className={`landing-page-container ${
                  darkTheme ? "dark" : "light"
                }`}
              >
                <nav className="nav-container">
                  <h1>TrackSmart</h1>
                  <div className="theme-login-button-container">
                    <button
                      type="button"
                      className="moon-sun-container"
                      onClick={onChangeTheme}
                    >
                      {darkTheme ? (
                        <LuMoon className="moon-icon" />
                      ) : (
                        <IoSunnyOutline className="sun-icon" />
                      )}
                    </button>
                    <Popup
                      trigger={
                        <button
                          type="button"
                          className={
                            darkTheme ? "login-button" : "login-light-button"
                          }
                        >
                          Login
                        </button>
                      }
                      modal
                      overlayStyle={overLayStyle}
                    >
                      {(close) => (
                        <div className="popup-container">
                          <h2>Login</h2>
                          <form
                            className="popup-form"
                            onSubmit={this.handleLogin}
                          >
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                id="email"
                                required
                                onChange={this.onEnterEmail}
                                value={emailId}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <div className="login-form-password-container">
                                <input
                                  className="password-input-container"
                                  type={passwordShown ? "text" : "password"}
                                  id="password"
                                  required
                                  onChange={this.onEnterPassword}
                                  value={password}
                                />
                                <button
                                  type="button"
                                  onClick={this.handleHideOrShowPassword}
                                  className="password-button"
                                >
                                  {passwordShown ? <FaEye /> : <FaEyeSlash />}
                                </button>
                              </div>
                            </div>
                            {showErrorMsg ? (
                              <p className="error-msg">{errorMsg}</p>
                            ) : (
                              ""
                            )}
                            <button type="submit" className="submit-btn">
                              Login
                            </button>
                            <button
                              type="button"
                              onClick={close}
                              className="close-btn"
                            >
                              Cancel
                            </button>
                          </form>
                        </div>
                      )}
                    </Popup>
                  </div>
                </nav>

                <div className="landing-page-main-container">
                  <div className="landing-page-heading">
                    <span>TrackSmart</span>
                    <div className="typing-container">
                      <span className="typing-text">
                        Where Every Penny Tells a Story
                      </span>
                    </div>
                  </div>
                  <p
                    className={
                      darkTheme === true
                        ? "landing-page-description"
                        : "dark-description"
                    }
                  >
                    Take control of your spending with our intuitive expense
                    tracker.
                    <Link
                      to="/signup"
                      className={
                        darkTheme ? "signup-link" : "signup-light-link"
                      }
                    >
                      Sign up
                    </Link>
                    today and start making every rupee count!
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

export default Landing;
