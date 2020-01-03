import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Nav.css";

import logoGr from "../../img/logo.png";
import logoEn from "../../img/logo-en.png";

import { getLanguage, setLanguage, translate } from "react-switch-lang";

class Nav extends Component {
  render() {
    let logo = getLanguage() === "en" ? logoEn : logoGr;

    return (
      <nav>
        <img src={logo} alt="Logo" className="Logo" />
        <div className="Lang-switcher">
          <button className="Lang-gr" onClick={() => setLanguage("gr")}>
            <span role="img" aria-label="Greek">
              🇬🇷
            </span>
          </button>
          <button className="Lang-en" onClick={() => setLanguage("en")}>
            <span role="img" aria-label="English">
              🇺🇸
            </span>
          </button>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate(Nav);
