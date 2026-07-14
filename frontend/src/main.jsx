import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./main.css";

import { AuthProvider } from "./context/AuthContext";
import {
  QuoteCartProvider,
} from "./context/QuoteCartContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <AuthProvider>
      <QuoteCartProvider>
        <App />
      </QuoteCartProvider>
    </AuthProvider>
  </BrowserRouter>
);