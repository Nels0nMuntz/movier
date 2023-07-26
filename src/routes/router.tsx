import { PropsWithChildren } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";

import { AuthLogin, AuthWelcome, NotFound, Browse, Movies, MovieDetails, TVShowDetails } from "pages";
import { APP_URLS } from "./urls";
import { Shows } from "pages/Shows";


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
        path={APP_URLS.movies.path}
        loader={APP_URLS.movies.loader}
        element={
          <PrivateRoute>
            <Movies />
          </PrivateRoute>
        }
      />
      <Route
        path={APP_URLS.tvShows.path}
        loader={APP_URLS.tvShows.loader}
        element={
          <PrivateRoute>
            <Shows />
          </PrivateRoute>
        }
      />
      <Route
        path={APP_URLS.movieDetails.path}
        element={
          <PrivateRoute>
            <MovieDetails/>
          </PrivateRoute>
        }
        loader={(route) => {          
          APP_URLS.movieDetails.loader(Number(route.params.id))
          return null
        }}
      />
      <Route
        path={APP_URLS.tvShowDetails.path}
        element={
          <PrivateRoute>
            <TVShowDetails/>
          </PrivateRoute>
        }
        loader={(route) => {          
          APP_URLS.tvShowDetails.loader(Number(route.params.id))
          return null
        }}
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