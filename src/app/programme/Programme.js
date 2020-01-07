import React from "react";
import Courses from "./courses/Courses";

import { useTranslation } from "react-i18next";

import "./Programme.css";

export default () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="Info-box">
        <h1>{t("desc")}</h1>
      </div>
      <Courses />
    </div>
  );
};
