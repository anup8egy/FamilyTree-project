import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteChange from "./components/onRouteChange";

// Components
import ErrorPage from "./components/error/index";

// Non Logged-In
import NavBar from "./components/loggedOutNavBar/index";
import LandingPage from "./components/landingPage/index";
import Loginpage from "./components/login/login";
import RegisterPage from "./components/register/register";
import ForgotPassword from "./components/forgotPassword/forgot";

// Logged Componts
import LoggedNavBar from "./components/loggedNavBar/index";
import Profile from "./components/profile/index";
import { PushNotification } from "./components/global/index";

// State
import { useSelector } from "react-redux";

class App extends Component {
  state = {
    isLoggedIn: true,
    open: true,
  };

  toggleNotSnack = (value) => {
    this.setState({ open: Boolean(value) });
  };

  render() {
    return (
      <React.Fragment>
        <PushNotification
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
