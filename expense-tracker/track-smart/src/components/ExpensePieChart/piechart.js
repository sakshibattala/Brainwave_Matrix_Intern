import { Component } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

import "./piechart.css";
import Context from "../../context/Context";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFF",
  "#FF5E7E",
  "#00D4FF",
  "#FFB5E8",
  "#AAFF00",
  "#FF9F1C",
];

class ExpensePieChart extends Component {
  static contextType = Context;

  getGroupedExpenses = () => {
    const currentUser = localStorage.getItem("currentUser");
    const storedData = JSON.parse(localStorage.getItem("expensesList")) || {};
    const userData = storedData[currentUser] || [];

    // Filter only expense type
    const expensesOnly = userData.filter(
      (item) => item.selectedType === "expense"
    );

    const grouped = {};

    expensesOnly.forEach((expense) => {
      const { expenseCategory, expenseAmt } = expense;
      const amount = parseFloat(expenseAmt);
      if (!isNaN(amount)) {
        if (grouped[expenseCategory]) {
          grouped[expenseCategory] += amount;
        } else {
          grouped[expenseCategory] = amount;
        }
      }
    });

    // Convert to array for recharts
    const data = Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));

    return data;
  };

  render() {
    const data = this.getGroupedExpenses();
    const hasData = data.length > 0;
    const { darkTheme } = this.context;

    // Responsive outer radius based on screen width
    const screenWidth = window.innerWidth;
    const outerRadius = screenWidth <= 576 ? 70 : 100; // smaller radius for small screens

    return (
      <div className="piechart-container">
        <h2
          className={darkTheme ? "piechart-heading" : "dark-piechart-heading"}
        >
          Expense Breakdown
        </h2>

        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={outerRadius}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-expenses-msg">
            Add some expenses to see the pie chart
          </p>
        )}
      </div>
    );
  }
}

export default ExpensePieChart;
