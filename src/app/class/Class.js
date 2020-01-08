import React, { Component } from "react";
import "./Class.css";

import ClassInfo from "./class-info/ClassInfo";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import BackBar from "../components/back-bar/BackBar";

class Class extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/:classID`}>
          <BackBar home={true} />
          <ClassInfo />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default withRouter(Class);
