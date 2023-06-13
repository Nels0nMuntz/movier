import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { APP_URLS } from "routes/urls";


export const PrivateRoute: React.FC = () => {
  const isAuthorized = Boolean(window.localStorage.getItem("session_id"));
  return isAuthorized ? <Outlet/> : <Navigate to={APP_URLS.authWelcome} state={{ from: window.location }} />;
};
