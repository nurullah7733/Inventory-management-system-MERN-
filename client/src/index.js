import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/app/store";
import App from "./App";
import "../src/assets/css/animate.css";
import "../src/assets/css/bootstrap.css";
import "../src/assets/css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode> }
);
