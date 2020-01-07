import React, { Component } from "react";
import Courses from "../../components/courses/Courses";

import { translate } from "react-switch-lang";
import PropTypes from "prop-types";

import "./Programme.css";

class Programme extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="Info-box">
          <h1>{t("desc")}</h1>
        </div>
        <Courses />
      </div>
    );
  }
}

Programme.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate(Programme);
