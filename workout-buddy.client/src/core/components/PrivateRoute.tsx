import React from "react";
import { Navigate } from "react-router-dom";

interface IPrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const authenticated = sessionStorage.getItem("token");
  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
