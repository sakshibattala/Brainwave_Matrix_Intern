import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const currentUser = localStorage.getItem("currentUser");

  const users = localStorage.getItem("users");
  const existingUsers = JSON.parse(users) || [];

  const userExists = existingUsers.find((user) => user.emailId === currentUser);

  if (userExists) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
