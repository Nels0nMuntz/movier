import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";

import { AuthLogin, AuthWelcome, NotFound, Browse, Movies, MovieDetails, TVShowDetails, Shows, Favorite, Watchlist, SearchResult } from "pages";
import { APP_URLS } from "./urls";
import { PrivateRoute, PublicRoute } from "components";


export const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
      <Route
        path={APP_URLS.authWelcome.path}
        element={
          <PublicRoute>
            <AuthWelcome />
          </PublicRoute>
        }
      />
      <Route
        path={APP_URLS.authLogin.path}
        loader={APP_URLS.authLogin.loader}
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
        loader={(route) => APP_URLS.movieDetails.loader(Number(route.params.id))}
        element={
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        }
      />
      <Route
        path={APP_URLS.tvShowDetails.path}
        loader={(route) => APP_URLS.tvShowDetails.loader(Number(route.params.id))}
        element={
          <PrivateRoute>
            <TVShowDetails />
          </PrivateRoute>
        }
      />
      <Route path="/watchlist">
        <Route
          path=":type"
          loader={APP_URLS.watchlist.loader}
          element={
            <PrivateRoute>
              <Watchlist />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="favorite">
        <Route
          path=":type"
          loader={APP_URLS.favorite.loader}
          element={
            <PrivateRoute>
              <Favorite />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path={APP_URLS.searchResult.path}
        loader={APP_URLS.searchResult.loader}
        element={
          <PrivateRoute>
            <SearchResult/>
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