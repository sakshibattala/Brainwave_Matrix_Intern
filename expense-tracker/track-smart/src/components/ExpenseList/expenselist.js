import { Component } from "react";
import "./expenselist.css";
import Context from "../../context/Context";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

class ExpenseList extends Component {
  static contextType = Context;

  state = {
    showModal: false,
    selectedExpense: null,
  };

  handleDeleteExpenseList = (id) => {
    const currentUser = localStorage.getItem("currentUser");
    const storedData = JSON.parse(localStorage.getItem("expensesList")) || {};
    const userData = storedData[currentUser] || [];

    if (userData) {
      const newData = userData.filter((list) => list.id !== id);
      storedData[currentUser] = newData;
      localStorage.setItem("expensesList", JSON.stringify(storedData));

      this.context.updateExpensesList(newData);
    }
  };

  openEditModal = (expense) => {
    this.setState({ showModal: true, selectedExpense: { ...expense } });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      selectedExpense: {
        ...prevState.selectedExpense,
        [name]: value,
      },
    }));
  };

  handleSave = () => {
    const { selectedExpense } = this.state;
    const { updateExpensesList } = this.context;
    const currentUser = localStorage.getItem("currentUser");
    const storedData = JSON.parse(localStorage.getItem("expensesList")) || {};
    const userData = storedData[currentUser] || [];

    const updatedExpenses = userData.map((item) =>
      item.id === selectedExpense.id ? selectedExpense : item
    );

    storedData[currentUser] = updatedExpenses;
    localStorage.setItem("expensesList", JSON.stringify(storedData));
    updateExpensesList(updatedExpenses);
    this.setState({ showModal: false, selectedExpense: null });
  };

  render() {
    const { darkTheme, expensesList } = this.context;
    const { showModal, selectedExpense } = this.state;

    return (
      <div
        className={
          darkTheme ? "expenselist-container" : "expense-list-light-container"
        }
      >
        {expensesList.length > 0 ? (
          <>
            <h2 className={darkTheme ? "list-heading" : "list-light-heading"}>
              Expense List
            </h2>
            <table
              className={darkTheme ? "expense-table" : "expense-light-table"}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expensesList.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.expenseEnteredDate}</td>
                    <td>{expense.expenseTitle}</td>
                    <td>{expense.selectedType}</td>
                    <td>{expense.expenseCategory}</td>
                    <td>{expense.expenseAmt}</td>
                    <td>
                      <button
                        className={darkTheme ? "edit-btn" : "edit-light-btn"}
                        onClick={() => this.openEditModal(expense)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleDeleteExpenseList(expense.id)}
                        className={
                          darkTheme ? "delete-btn" : "delete-light-btn"
                        }
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className={darkTheme ? "empty-text" : "empty-light-text"}>
            No expenses added yet.
          </p>
        )}

        {/* Edit Modal */}
        {showModal && selectedExpense && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Edit Expense</h3>
              <label>
                Title:
                <input
                  type="text"
                  name="expenseTitle"
                  value={selectedExpense.expenseTitle}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="expenseCategory"
                  value={selectedExpense.expenseCategory}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="expenseAmt"
                  value={selectedExpense.expenseAmt}
                  onChange={this.handleInputChange}
                />
              </label>
              <div className="modal-buttons">
                <button onClick={this.handleSave}>Save</button>
                <button
                  onClick={() =>
                    this.setState({ showModal: false, selectedExpense: null })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ExpenseList;
