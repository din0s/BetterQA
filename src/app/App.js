import React from "react";
import "./App.css";

import Nav from "./components/navbar/Nav";
import Programme from "./programme/Programme";
import Class from "./class/Class";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../i18n/i18n";

export default () => {
  return (
    <div className="App">
      <div className="App-content">
        <Nav />
        <Router>
          <Switch>
            <Route path="/class">
              <Class />
            </Route>
            <Route path="/">
              <Programme />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};
