import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./header.css";
import Context from "../../context/Context";
import HeaderSmallDevices from "../HeaderSmallDevices/headersmall";

import { LuMoon } from "react-icons/lu";

import { IoSunnyOutline } from "react-icons/io5";

class Header extends Component {
  handleLogout = () => {
    // const currentUser = localStorage.getItem("currentUser");

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    const { history } = this.props;
    history.replace("/");
  };

  render() {
    return (
      <Context.Consumer>
        {(value) => {
          const { darkTheme, toggleTheme } = value;

          const onChangeTheme = () => toggleTheme();

          const { location } = this.props;
          const currentLocation = location.pathname;

          return (
            <>
              <div className="header-outer-container">
                <div
                  className={
                    darkTheme
                      ? "header-main-container"
                      : "header-main-light-container"
                  }
                >
                  <Link to="/dashboard">
                    <h1
                      data-tabid="dashboard"
                      className={`tab-title ${
                        currentLocation === "/dashboard" ? "active-tab" : "tab"
                      } ${darkTheme ? "dark-text" : "light-text"}`}
             
                    >
                      Dashboard
                    </h1>
                  </Link>

                  <Link to="/summary">
                    <h1
                      data-tabid="summary"
                      className={`tab-title ${
                        currentLocation === "/summary" ? "active-tab" : "tab"
                      } ${darkTheme ? "dark-text" : "light-text"}`}
            
                    >
                      Summary
                    </h1>
                  </Link>

                  <Link to="/settings">
                    <h1
                      data-tabid="settings"
                      className={`tab-title ${
                        currentLocation === "/settings" ? "active-tab" : "tab"
                      } ${darkTheme ? "dark-text" : "light-text"}`}
                 
                    >
                      Settings
                    </h1>
                  </Link>

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

                  <button
                    className={
                      darkTheme ? "logout-button" : "logout-light-button"
                    }
                    onClick={this.handleLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <HeaderSmallDevices />
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(Header);
