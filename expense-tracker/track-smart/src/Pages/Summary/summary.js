import { Component } from "react";
import Context from "../../context/Context";

import Header from "../../components/Header/header";
import ExpenseList from "../../components/ExpenseList/expenselist";
import "./summary.css";

class Summary extends Component {
  static contextType = Context;

  state = {
    income: 0,
    balance: 0,
    expense: 0,
    prevExpensesList: [],
  };

  componentDidMount() {
    this.calculateSummary(this.context.expensesList);
  }

  componentDidUpdate(prevProps, prevState) {
    const { expensesList } = this.context;
    const { prevExpensesList } = this.state;

    // Convert to JSON string for deep comparison
    const prevData = JSON.stringify(prevExpensesList);
    const currentData = JSON.stringify(expensesList);

    if (prevData !== currentData) {
      this.calculateSummary(expensesList);
    }
  }

  calculateSummary = (expensesList) => {
    let income = 0;
    let expense = 0;

    expensesList.forEach((item) => {
      const amount = parseInt(item.expenseAmt);
      if (item.selectedType === "income") {
        income += amount;
      } else if (item.selectedType === "expense") {
        expense += amount;
      }
    });

    const balance = income - expense;

    this.setState({ income, expense, balance, prevExpensesList: expensesList });
  };

  render() {
    const { darkTheme } = this.context;
    const { income, expense, balance } = this.state;

    return (
      <div className="summary-outer-container">
        <Header />
        <div className="summary-main-container">
          <div className="summary-inner-main-container">
            <div className="balances-container">
              <div
                className={
                  darkTheme
                    ? "each-balance-container"
                    : "each-container-light-theme"
                }
              >
                <p>Income</p>
                <h1>{income}</h1>
              </div>
              <div
                className={
                  darkTheme
                    ? "each-balance-container"
                    : "each-container-light-theme"
                }
              >
                <p>Expense</p>
                <h1>{expense}</h1>
              </div>
              <div
                className={
                  darkTheme
                    ? "each-balance-container"
                    : "each-container-light-theme"
                }
              >
                <p>Balance</p>
                <h1>{balance}</h1>
              </div>
            </div>
            <ExpenseList />
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
