import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Error from "./components/error";
import Navbar from "./components/navBar";
import "./fonts/fonts.css";
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
