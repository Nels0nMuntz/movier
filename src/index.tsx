import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import { theme } from "./styles/theme";
import { AppRouter } from "routes/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter/>
    </ThemeProvider>
  </React.StrictMode>
);