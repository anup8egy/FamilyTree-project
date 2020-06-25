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
        <NavBar />
        <Router>
          <RouteChange />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/login">
              <Loginpage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/forgotpassword">
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
