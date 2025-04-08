import { Component } from "react";
import "./headersmall.css";
import Context from "../../context/Context";
import { withRouter, Link } from "react-router-dom";

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { LuMoon } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa6";

class HeaderSmallDevices extends Component {
  handleLogout = () => {
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

          const { location } = this.props;
          const currentPath = location.pathname;

          return (
            <div className="header-small-devices-container">
              <div className="header-small-devices-inner-container">
                <Link to="/dashboard">
                  <button
            
                    data-tabid="dashboard"
                    className={`${
                      darkTheme
                        ? "dark-smalldevice-icon"
                        : "light-smalldevice-icon"
                    } ${currentPath === "/dashboard" ? "active-tab" : "tab"}`}
                  >
                    <MdOutlineDashboardCustomize />
                  </button>
                </Link>

                <Link to="/summary">
                  <button
             
                    data-tabid="summary"
                    className={`${
                      darkTheme
                        ? "dark-smalldevice-icon"
                        : "light-smalldevice-icon"
                    } ${currentPath === "/summary" ? "active-tab" : "tab"}`}
                  >
                    <FaChartPie />
                  </button>
                </Link>

                <Link to="/settings">
                  <button
                  
                    data-tabid="settings"
                    className={`${
                      darkTheme
                        ? "dark-smalldevice-icon"
                        : "light-smalldevice-icon"
                    } ${currentPath === "/settings" ? "active-tab" : "tab"}`}
                  >
                    <IoIosSettings />
                  </button>
                </Link>

                <button
                  onClick={() => toggleTheme()}
                  className={
                    darkTheme
                      ? "dark-smalldevice-icon"
                      : "light-smalldevice-icon"
                  }
                >
                  {darkTheme ? <LuMoon /> : <IoSunnyOutline />}
                </button>

                <button
                  onClick={this.handleLogout}
                  className={
                    darkTheme
                      ? "dark-smalldevice-icon"
                      : "light-smalldevice-icon"
                  }
                >
                  <IoIosLogOut />
                </button>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(HeaderSmallDevices);
