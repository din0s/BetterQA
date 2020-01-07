import React from "react";
import "./Nav.css";

import logoGr from "../../img/logo.png";
import logoEn from "../../img/logo-en.png";

import { useTranslation } from 'react-i18next';

export default () => {
  const { i18n } = useTranslation();
  const logo = i18n.language === "en" ? logoEn : logoGr;

  return (
    <nav>
      <img src={logo} alt="Logo" className="Logo" />
      <div className="Lang-switcher">
        <button className="Lang-gr" onClick={() => i18n.changeLanguage("gr")}>
          <span role="img" aria-label="Greek">
            🇬🇷
          </span>
        </button>
        <button className="Lang-en" onClick={() => i18n.changeLanguage("en")}>
          <span role="img" aria-label="English">
            🇺🇸
          </span>
        </button>
      </div>
    </nav>
  );
};
