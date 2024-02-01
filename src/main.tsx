import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./AppRoutes.tsx";
import { Layout } from "./components/Layout/Layout.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme.ts";
import { BookProvider } from "./context/BookProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <BookProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </BookProvider>
    </Router>
  </React.StrictMode>
);
