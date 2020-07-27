import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./fonts/fonts.css";

import { Provider } from "react-redux";
import Store from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  rootElement
);
