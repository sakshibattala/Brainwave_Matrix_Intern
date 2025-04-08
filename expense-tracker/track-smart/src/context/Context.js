import React from "react";

const Context = React.createContext({
  darkTheme: false,
  toggleTheme: () => {},
  expensesList: [],
  updateExpensesList: () => {},
  clearData: () => {},
});

export default Context;
