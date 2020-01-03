import React, { Component } from "react";
import PropTypes from "prop-types";

import Nav from "./components/navigator/Nav";
import Courses from "./components/courses/Courses";
import "./App.css";

import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  translate
} from "react-switch-lang";

import en from "./lang/en.json";
import gr from "./lang/gr.json";

setTranslations({ en, gr });
setDefaultLanguage("en");
setLanguageCookie();

class App extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="App">
        <div className="App-content">
          <Nav />
          <div className="Info-box">
            <h1>{t("desc")}</h1>
          </div>
          <Courses />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate(App);
