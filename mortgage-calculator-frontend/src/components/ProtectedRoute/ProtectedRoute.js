import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Comment, ...props }) => {
  return (
    <Route>
      {() => (props.loggedIn ? <Comment {...props} /> : <Redirect to="/sign-in" />)}
    </Route>
  );
};

export default ProtectedRoute;