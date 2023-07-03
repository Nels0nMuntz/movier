import React, { PropsWithChildren } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { APP_URLS } from "routes/urls";


export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const isAuthorized = Boolean(window.localStorage.getItem("session_id"));
  return isAuthorized ? <>{children}</> : <Navigate to={APP_URLS.authWelcome} state={{ from: window.location }} />;
};
