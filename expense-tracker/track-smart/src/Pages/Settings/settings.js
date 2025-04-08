import { Component } from "react";
import "./settings.css";
import Context from "../../context/Context";
import Header from "../../components/Header/header";

class Settings extends Component {
  static contextType = Context;

  state = { showErrMsg: false };

  handleClearDataBtn = () => {
    const {clearData } = this.context;

    clearData();

    this.setState({ showErrMsg: true });

    setTimeout(() => {
      this.setState({ showErrMsg: false });
    }, 3000);
  };

  render() {
    const { darkTheme } = this.context;
    const { showErrMsg } = this.state;

    return (
      <div className="settings-outer-container">
        <Header />
        {showErrMsg && (
          <p className="error-data-cleared-msg">Data cleared Successfully</p>
        )}
        <div className="settings-inner-container">
          <div className="settings-main-container">
            <div className="each-setting-container">
              <p>Email</p>
              <p className="email-id">sakshi@gmail.com</p>
            </div>
            <div className="each-setting-container">
              <p>Appearances</p>
              <p>{darkTheme ? "Dark" : "Light"}</p>
            </div>
            <div className="each-setting-container">
              <p>Preferences</p>
              <button
                onClick={this.handleClearDataBtn}
                type="button"
                className={
                  darkTheme ? "dark-clear-all-button" : "light-clear-all-button"
                }
              >
                Clear all data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
