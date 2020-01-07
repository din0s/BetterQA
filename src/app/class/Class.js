import React, { Component } from "react";
import "./Class.css";

import { Switch, Route, withRouter, useParams, Redirect } from "react-router-dom";
import { withTranslation } from 'react-i18next';

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
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Class));
