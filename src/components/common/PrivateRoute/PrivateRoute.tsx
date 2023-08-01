import { observer } from "mobx-react-lite";
import React, { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";
import { APP_URLS } from "routes/urls";
import { useStore } from "store";
import { localStorageHelper } from "utils";


export const PrivateRoute: React.FC<PropsWithChildren> = observer(({ children }) => {
  const { accountStore } = useStore();
  const { isAccountDetailsReceived: isDataLoaded, loadAccountDetails} = accountStore
  const isAuthorized = Boolean(localStorageHelper.sessionId);
  React.useEffect(() => {
    if(!isDataLoaded) {
      loadAccountDetails();
    }
  }, [isDataLoaded, loadAccountDetails])
  return isAuthorized ? <>{children}</> : <Navigate to={APP_URLS.authWelcome} state={{ from: window.location }} />;
});
