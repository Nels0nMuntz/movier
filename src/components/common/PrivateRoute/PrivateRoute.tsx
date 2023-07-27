import React, { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";
import { APP_URLS } from "routes/urls";
import { localStorageHelper } from "utils";


export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const isAuthorized = Boolean(localStorageHelper.sessionId);
  return isAuthorized ? <>{children}</> : <Navigate to={APP_URLS.authWelcome} state={{ from: window.location }} />;
};
