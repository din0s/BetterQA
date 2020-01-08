import React from "react";
import "./BackBar.css";

import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";

function BackLink() {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <span className="Back-text">{t("back")}</span>
    </Link>
  );
}

function BackText() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <span onClick={() => history.goBack()}>
      <span className="Back-text">{t("back")}</span>
    </span>
  );
}

export default props => {
  return (
    <div className="Back-bar">
      {props.home === true ? <BackLink /> : <BackText />}
    </div>
  );
};
