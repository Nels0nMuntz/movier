import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";

import { AuthLogin, AuthWelcome, NotFound, Browse, Movies, MovieDetails, TVShowDetails, Shows } from "pages";
import { APP_URLS } from "./urls";
import { PrivateRoute, PublicRoute } from "components";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
      <Route
        path={APP_URLS.authWelcome}
        element={
          <PublicRoute>
            <AuthWelcome />
          </PublicRoute>
        }
      />
      <Route
        path={APP_URLS.authLogin}
        element={
          <PublicRoute>
            <AuthLogin />
          </PublicRoute>
        }
      />
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
            <MovieDetails />
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
            <TVShowDetails />
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