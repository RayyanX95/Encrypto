import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

/* we use: <HashRouter> 
             <App />
           </HashRouter>
  to solve the problem of routing in rereshing any page of the website */
const app = (
  <BrowserRouter>
    <HashRouter> 
      <App />
    </HashRouter>
  </BrowserRouter>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
