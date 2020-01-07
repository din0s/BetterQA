import React, { Component } from "react";
import "./Class.css";

import { translate } from "react-switch-lang";
import PropTypes from "prop-types";

import { Switch, Route, withRouter, useParams } from "react-router-dom";

function ClassInfo() {
  const { classID } = useParams();
  return <div>{classID}</div>;
}

class Class extends Component {
  render() {
    const { t, match } = this.props;
    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:classID`}>
            <ClassInfo />
          </Route>
          <Route path={match.path}>
            <h3>{t("class.select")}</h3>
          </Route>
        </Switch>
      </div>
    );
  }
}

Class.propTypes = {
  t: PropTypes.func.isRequired
};

export default withRouter(translate(Class));
