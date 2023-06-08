import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Browse } from "pages/Browse";
import { AuthWelcome } from "pages/auth/AuthWelcome";
import { AuthLogin } from "pages/auth/AuthLogin";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/auth-welcome" element={<AuthWelcome />} />,
      <Route path="/auth-login" element={<AuthLogin />} />,
      <Route
        path="/"
      // element={<ProtectedRoute/>}
      >
        <Route path="/browse" element={<Browse />} />,
      </Route>
    </>
  )
)