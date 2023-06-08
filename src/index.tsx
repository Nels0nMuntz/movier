import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import { theme } from "./styles/theme";
import { router } from "router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>
);