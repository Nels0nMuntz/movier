import { observer } from "mobx-react-lite";
import React, { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";
import { APP_URLS } from "routes/urls";
import { useStore } from "store";
import { localStorageHelper } from "utils";


export const PrivateRoute: React.FC<PropsWithChildren> = observer(({ children }) => {
  const { accountStore } = useStore();
  const { isAccountDetailsReceived: isDataLoaded, getAccountDetails} = accountStore;
  const sessionId = localStorageHelper.sessionId;
  const isAuthorized = Boolean(sessionId);
  React.useEffect(() => {
    if(isAuthorized && !isDataLoaded) {
      getAccountDetails(sessionId);
    }
  }, [isDataLoaded, isAuthorized, sessionId, getAccountDetails])
  return isAuthorized ? <>{children}</> : <Navigate to={APP_URLS.authWelcome.path} state={{ from: window.location }} />;
});
