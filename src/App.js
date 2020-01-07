import React, { Component } from "react";

import Nav from "./components/navigator/Nav";
import Programme from "./pages/programme/Programme";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie
} from "react-switch-lang";

import en from "./lang/en.json";
import gr from "./lang/gr.json";
import Class from "./pages/class/Class";

setTranslations({ en, gr });
setDefaultLanguage("en");
setLanguageCookie();

class App extends Component {
  render() {
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
  }
}

export default App;
