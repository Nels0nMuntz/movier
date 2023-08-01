import React, { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";
import { APP_URLS } from "routes";
import { localStorageHelper } from "utils";


export const PublicRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const isAuthorized = Boolean(localStorageHelper.sessionId);
  return isAuthorized ? <Navigate to={APP_URLS.browse.path} state={{ from: window.location }} />: <>{children}</> ;
};