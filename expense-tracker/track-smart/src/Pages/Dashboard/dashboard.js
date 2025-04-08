import { Component } from "react";
import Header from "../../components/Header/header";
import ExpensePieChart from "../../components/ExpensePieChart/piechart";

import Context from "../../context/Context";

import "./dashboard.css";

const incomeOptions = [
  "Salary",
  "Freelance",
  "Interest",
  "Refunds",
  "Bonus",
  "Gifts",
];

const expenseOptions = [
  "Food",
  "Groceries",
  "Bills",
  "Rent",
  "Travel",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Subscriptions",
  "Fuel",
];

class Dashboard extends Component {
  static contextType = Context;

  state = {
    expensesList: [],
    selectedType: "",
    typeOfCategoryOptions: [],
    expenseTitle: "",
    expenseAmt: 0,
    expenseCategory: "",
    expenseEnteredDate: "",
    welcomeName: "",
    showSuccessPopup: false,
    showErrorPopup: false,
  };

  handleExpenseTitle = (event) =>
    this.setState({ expenseTitle: event.target.value });

  handleExpenseAmount = (event) =>
    this.setState({ expenseAmt: event.target.value });

  handleExpenseCategory = (event) =>
    this.setState({ expenseCategory: event.target.value });

  handleExpenseDate = (event) =>
    this.setState({ expenseEnteredDate: event.target.value });

  handleExpenseType = (event) => {
    const selectedType = event.target.value;
    let categoryOptions = [];

    if (selectedType === "income") {
      categoryOptions = incomeOptions;
    } else if (selectedType === "expense") {
      categoryOptions = expenseOptions;
    } else {
      categoryOptions = [];
    }

    this.setState({ selectedType, typeOfCategoryOptions: categoryOptions });
  };

  handleClearExpenseButton = () =>
    this.setState({
      selectedType: "",
      typeOfCategoryOptions: [],
      expenseTitle: "",
      expenseAmt: 0,
      expenseCategory: "",
      expenseEnteredDate: "",
    });

  handleAddExpenseButton = (event) => {
    event.preventDefault();
    const {
      expenseTitle,
      expenseAmt,
      selectedType,
      expenseCategory,
      expenseEnteredDate,
    } = this.state;

    if (isNaN(expenseAmt) || parseFloat(expenseAmt) <= 0) {
      this.setState({ showErrorPopup: true });
      setTimeout(() => {
        this.setState({ showErrorPopup: false });
      }, 3000);
      return;
    }

    const newExpense = {
      id: Date.now(),
      expenseTitle,
      expenseAmt,
      selectedType,
      expenseCategory,
      expenseEnteredDate,
    };

    const currentUser = localStorage.getItem("currentUser");
    const storedData = JSON.parse(localStorage.getItem("expensesList")) || {};
    const userData = storedData[currentUser] || [];
    userData.push(newExpense);
    storedData[currentUser] = userData;
    localStorage.setItem("expensesList", JSON.stringify(storedData));

    this.context.updateExpensesList(userData);

    this.setState({ showSuccessPopup: true });
    setTimeout(() => {
      this.setState({ showSuccessPopup: false });
    }, 3000);

    this.handleClearExpenseButton();
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    const welcomeName = currentUser.split("@")[0];
    this.setState({ welcomeName });
  }

  render() {
    const {
      showSuccessPopup,
      typeOfCategoryOptions,
      expenseTitle,
      expenseAmt,
      selectedType,
      expenseCategory,
      expenseEnteredDate,
      welcomeName,
      showErrorPopup
    } = this.state;

    return (
      <div className="dashboard-outer-container">
        <Context.Consumer>
          {(value) => {
            const { darkTheme } = value;

            const renderExpenseForm = () => (
              <>
                <form
                  autoComplete="off"
                  onSubmit={this.handleAddExpenseButton}
                  className={
                    darkTheme
                      ? "expense-form-container"
                      : "expense-form-light-container"
                  }
                >
                  <h2>Log an Expense</h2>

                  <div
                    className={
                      darkTheme
                        ? "title-amount-container"
                        : "title-amount-light-container"
                    }
                  >
                    <div className="input-group">
                      <label htmlFor="title">Title</label>
                      <input
                        required
                        value={expenseTitle}
                        type="text"
                        id="title"
                        onChange={this.handleExpenseTitle}
                        className={
                          darkTheme ? "dark-title-input" : "light-title-input"
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="amount">Amount</label>
                      <input
                        required
                        value={expenseAmt}
                        type="text"
                        id="amount"
                        onChange={this.handleExpenseAmount}
                        className={
                          darkTheme ? "dark-amount-input" : "light-amount-input"
                        }
                      />
                    </div>
                  </div>

                  <div
                    className={
                      darkTheme ? "type-container" : "type-light-container"
                    }
                  >
                    <label htmlFor="type">Type</label>
                    <select
                      required
                      value={selectedType}
                      id="type"
                      onChange={this.handleExpenseType}
                    >
                      <option value="">Select Type</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>

                  <div
                    className={
                      darkTheme
                        ? "category-container"
                        : "category-light-container"
                    }
                  >
                    <label htmlFor="category">Category</label>
                    <select
                      required
                      value={expenseCategory}
                      id="category"
                      onChange={this.handleExpenseCategory}
                    >
                      <option value="">Select Category</option>
                      {typeOfCategoryOptions.length > 0 &&
                        typeOfCategoryOptions.map((option) => (
                          <option value={option} key={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div
                    className={
                      darkTheme ? "date-container" : "date-light-container"
                    }
                  >
                    <label htmlFor="date">Date</label>
                    <input
                      required
                      value={expenseEnteredDate}
                      id="date"
                      type="date"
                      onChange={this.handleExpenseDate}
                    />
                  </div>

                  <div className="logout-clear-buttons-container">
                    <button
                      className={
                        darkTheme
                          ? "add-expense-button"
                          : "add-expense-light-button"
                      }
                      type="submit"
                    >
                      Add Expense
                    </button>
                    <button
                      onClick={this.handleClearExpenseButton}
                      className={
                        darkTheme ? "clear-button" : "clear-light-button"
                      }
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </>
            );

            return (
              <>
                <Header />
                {showSuccessPopup && (
                  <div className="popup-message">
                    Expense Added Successfully!
                  </div>
                )}
                {showErrorPopup && (
                  <div className="popup-error-message">
                    Please enter a valid number for the amount!
                  </div>
                )}

                <div className="dashboard-main-container">
                  <div className="dashboard-inner-container">
                    <h1 className="welcome-name">Welcome, {welcomeName} !</h1>
                    <p className="dashboard-description">
                      Want to revisit your past expenses? Head over to the
                      Summary section!
                    </p>
                    <div className="form-piechart-container">
                      {renderExpenseForm()}
                      <ExpensePieChart />
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Context.Consumer>
      </div>
    );
  }
}

export default Dashboard;
