import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import RouteChange from "./components/onRouteChange";
// Components
// Non Logged-In
import NavBar from "./components/Navbar";
import LandingPage from "./components/landingPage";
import ErrorPage from "./components/error";
import Loginpage from "./components/login/login";
import RegisterPage from "./components/register/register";
import ForgotPassword from "./components/forgotPassword/forgot";
// Logged Componts
import DashBoard from "./components/dashboard/dash";
class App extends Component {
  state = {
    isLoggedIn: true,
  };
  render() {
    return (
      <React.Fragment>
        <Router>
          <RouteChange />
          {this.state.isLoggedIn ? (
            <Switch>
              <Route exact path="/">
                <DashBoard />
              </Route>
              <Route path="*">
                <ErrorPage />
              </Route>
            </Switch>
          ) : (
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
          )}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
