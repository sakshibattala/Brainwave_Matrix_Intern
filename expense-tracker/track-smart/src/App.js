import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/protectedRoute";
import { getUserExpensesList } from "./storageUtils";

import Landing from "./Pages/Landing/landing";
import SignUp from "./Pages/SignUp/signup";
import Dashboard from "./Pages/Dashboard/dashboard";
import Summary from "./Pages/Summary/summary";

import Context from "./context/Context";

import "./App.css";
import Settings from "./Pages/Settings/settings";

class App extends Component {
  state = { darkTheme: true, expensesList: getUserExpensesList() };

  toggleTheme = () => this.setState((prev) => ({ darkTheme: !prev.darkTheme }));

  updateExpensesList = (newList) => {
    const currentUser = localStorage.getItem("currentUser");
    const storedData = JSON.parse(localStorage.getItem("expensesList")) || {};
    storedData[currentUser] = newList;
    localStorage.setItem("expensesList", JSON.stringify(storedData));

    this.setState({ expensesList: newList });
  };

  clearData = () => {
    const currentUser = localStorage.getItem("currentUser");
    const storedData = JSON.parse(localStorage.getItem("expensesList")) || {};

    delete storedData[currentUser];

    localStorage.setItem("expensesList", JSON.stringify(storedData));

    this.setState({ expensesList: [] });
  };

  render() {
    const { darkTheme, expensesList } = this.state;

    return (
      <Context.Provider
        value={{
          darkTheme,
          toggleTheme: this.toggleTheme,
          expensesList,
          updateExpensesList: this.updateExpensesList,
          clearData: this.clearData,
        }}
      >
        <div className={`app-root ${darkTheme ? "dark" : "light"}`}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/signup" component={SignUp} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/summary" component={Summary} />
              <ProtectedRoute exact path="/settings" component={Settings} />
            </Switch>
          </BrowserRouter>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
