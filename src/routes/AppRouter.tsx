import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Browse, AuthLogin, AuthWelcome, NotFound } from "pages";
import { APP_URLS } from "./urls";
import { PrivateRoute } from "components";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path={APP_URLS.browse}
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        /> */}
        <Route path={APP_URLS.authWelcome} element={<AuthWelcome />} />
        <Route path={APP_URLS.authLogin} element={<AuthLogin />} />
        {/* <Route
          path="/"
          element={
            <Navigate replace to={APP_URLS.browse} />
          }
        /> */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
};
