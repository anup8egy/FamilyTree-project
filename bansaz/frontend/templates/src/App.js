import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import RouteChange from "./components/onRouteChange";
// Components
import NavBar from "./components/Navbar";
import LandingPage from "./components/landingPage";
import ErrorPage from "./components/error";
import Loginpage from "./components/login/login";
import RegisterPage from "./components/register/register";
import ForgotPassword from "./components/forgotPassword/forgot";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <RouteChange />
          <Switch>
            <Route exact path="/">
              <NavBar />
              <LandingPage />
            </Route>
            <Route exact path="/login">
              <NavBar />
              <Loginpage />
            </Route>
            <Route exact path="/register">
              <NavBar />
              <RegisterPage />
            </Route>
            <Route exact path="/forgot">
              <NavBar />
              <ForgotPassword />
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
