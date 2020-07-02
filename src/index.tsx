import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { theme as primer } from "@primer/components";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <ThemeProvider theme={primer}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
