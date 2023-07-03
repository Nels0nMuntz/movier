import { PropsWithChildren } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";

import { AuthLogin, AuthWelcome, NotFound, Search, Browse } from "pages";
import { APP_URLS } from "./urls";


// eslint-disable-next-line react/prop-types
const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const isAuthorized = Boolean(window.localStorage.getItem("session_id"));
  return isAuthorized ? <>{children}</> : <Navigate to={APP_URLS.authWelcome} state={{ from: window.location }} />;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
      <Route path={APP_URLS.authWelcome} element={<AuthWelcome />} />
      <Route path={APP_URLS.authLogin} element={<AuthLogin />} />
      <Route
        path={APP_URLS.browse.path}
        loader={APP_URLS.browse.loader}
        element={
          <PrivateRoute>
            <Browse />
          </PrivateRoute>
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <Navigate to={APP_URLS.browse.path} replace />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)