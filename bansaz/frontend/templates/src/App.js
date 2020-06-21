import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import LandingPage from "./components/landingPage";
import ErrorPage from "./components/error";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Router>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
