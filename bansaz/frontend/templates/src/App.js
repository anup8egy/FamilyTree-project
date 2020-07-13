import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import RouteChange from "./components/onRouteChange";
// Components
// Non Logged-In
import NavBar from "./components/Navbar";
import LoggedNavBar from "./components/univ_component/dash_nav";
import LandingPage from "./components/landingPage";
import ErrorPage from "./components/error";
import Loginpage from "./components/login/login";
import RegisterPage from "./components/register/register";
import ForgotPassword from "./components/forgotPassword/forgot";
import Profile from "./components/profile/index";
import { NotificationTabBansaz } from "./components/univ_component/bansaz_items";

// Logged Componts
import DashBoard from "./components/dashboard/dash";
class App extends Component {
  state = {
    isLoggedIn: true,
    open: false,
  };
  toggleNotSnack = (value) => {
    this.setState({ open: Boolean(value) });
  };
  render() {
    return (
      <React.Fragment>
        <NotificationTabBansaz
          message="Somethings here"
          close={this.toggleNotSnack}
          open={this.state.open}
        />
        <Router>
          {/* If route changes then do this */}
          <RouteChange />
          {/* Routing for logged in */}
          {this.state.isLoggedIn ? (
            <Switch>
              <Route exact path="/">
                <LoggedNavBar />
                <DashBoard />
              </Route>
              <Route exact path="/profile">
                <LoggedNavBar />
                <Profile />
              </Route>
              <Route path="*">
                <ErrorPage />
              </Route>
            </Switch>
          ) : (
            // Routing if not logged in
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
