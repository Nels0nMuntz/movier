import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Browse, AuthLogin, AuthWelcome, Search } from "pages";
import { APP_URLS } from "./urls";
import { PrivateRoute } from "components";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute />}
        >
          <Route index path={APP_URLS.browse} element={<Browse />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path={APP_URLS.authWelcome} element={<AuthWelcome />} />
        <Route path={APP_URLS.authLogin} element={<AuthLogin />} />
      </Routes>
    </BrowserRouter>
  )
};
