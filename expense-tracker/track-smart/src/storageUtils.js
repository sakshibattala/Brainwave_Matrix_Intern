export const getUserExpensesList = () => {
  const currentUser = localStorage.getItem("currentUser");
  const storedData = JSON.parse(localStorage.getItem("expensesList")) || {};
  return storedData[currentUser] || [];
};
