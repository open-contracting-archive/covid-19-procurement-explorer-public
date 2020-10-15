import React from "react";
import ReactDOM from "react-dom";
import "./assets/tailwind.scss";
import "./assets/main.scss";
import App from "./App";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Notfound from "./components/notfound";
import About from "./layouts/About";
import Country from "./layouts/Country";
import Header from "./components/header";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/country/mexico" component={Country} />
        <Route component={Notfound} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
