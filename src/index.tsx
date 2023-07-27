import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "routes/router";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import "./index.css";
import { StoreProvider } from "store";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <StoreProvider>
      <SnackbarProvider>
        <CssBaseline />
        <RouterProvider router={router} fallbackElement />
      </SnackbarProvider>
    </StoreProvider>
  </ThemeProvider>
);