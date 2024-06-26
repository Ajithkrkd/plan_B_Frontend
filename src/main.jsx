import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { UrlProvider } from "./store/urlContext.jsx";
import reduxStore from "./store/redux/reduxStore.js";
import { fireBaseContext } from "./firebase/fireBaseContext.js";
import firebase from './firebase/config.js'
ReactDOM.createRoot(document.getElementById("root")).render(
  <fireBaseContext.Provider value={{ firebase }}>
  <UrlProvider>
    <Provider store={reduxStore}>
      <App />
    </Provider>
    <Toaster position="top-right" reverseOrder={false} />
  </UrlProvider>
  </fireBaseContext.Provider>
);
