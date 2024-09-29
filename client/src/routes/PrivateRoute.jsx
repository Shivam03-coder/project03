import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isUserAuthenticated } = useSelector((state) => state.user);

  return isUserAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoute;