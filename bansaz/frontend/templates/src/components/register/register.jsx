import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Swipe from "react-swipeable-views";
import { Helmet } from "react-helmet";

import AnimatedBackground from "./../AnimateBackground/index";
import LinearProgBar from "./LinearProgress";

import "./index.css";
import RegisterStyling from "./styles";

// Components
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import VerticalLinearStepper from "./Stepper";

// To get coookies by name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length >= 2) return parts.pop().split(";").shift();
}

// Send request to API to register first step

class Login extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
  }

  state = {
    swipeIndex: 0,
    isLoading: false,
    first_name: "",
    last_name: "",
    isFirstNameCorrect: true,
    isLastNameCorrect: true,
    username: "",
    isUsernameCorrect: true,
    emailAddress: "",
    isEmailCorrect: true,
    country: "",
    isCountryCorrect: true,
    countryPhoneCode: "",
    phone: "",
    isPhoneCorrect: true,
    password: "",
    isPasswordCorrect: true,
    confirmPassword: "",
    isConfirmPasswordCorrect: true,
    isFirstStepAllRight: false,
    geoLocation: "",
    geoPhoneCode: "",
    isPasswordShown: false,
    showFirstError: false,
    userToken: "",
  };

  // First Step Methods
  UNSAFE_componentWillMount() {
    this.getGeoLocation();
  }

  showHideLoader = (value) => {
    this.setState({ isLoading: value });
  };

  handleSwipe = (value) => {
    this.setState({ swipeIndex: value });
  };

  // To get autmatic location
  getGeoLocation = () => {
    let xhttp = new XMLHttpRequest();
    let sent = false;
    // Sending request to API
    const setnewCountryGeo = (countryCode, country) => {
      this.setState({
        geoLocation: countryCode,
      });
      this.setState({ country: country });
    };
    // Do this if api request failed
    const setDefault = () => {
      // If request all right
      this.setState({ geoLocation: "NP" });
      this.setState({ geoPhoneCode: "977" });
    };
    // If cannot create XMLHttpRequest instance
    if (!xhttp) setDefault();
    // If ready to send data
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // If request all right

        setnewCountryGeo(
          JSON.parse(this.responseText).country_code,
          JSON.parse(this.responseText).country_name
        );
        sent = true;
      }
    };
    xhttp.open("GET", "https://freegeoip.app/json/", true);
    xhttp.send();
    if (!sent) {
      // If request not sent
      // setDefault();
    }
  };

  // First when user clicks Next
  handleRegisterFirst = () => {
    // To show loader on top
    let allTrue = true;
    this.setState({ isLoading: true });
    // Check if Full Name empty
    let requiredParams = [
      this.state.first_name,
      this.state.last_name,
      this.state.username,
      this.state.emailAddress,
      this.state.country,
      this.state.phone,
      this.state.password,
      this.state.confirmPassword,
    ];

    let fnxParams = [
      (val) => this.checkFirstName(val),
      (val) => this.checkLastName(val),
      (val) => this.checkUsername(val),
      (val) => this.checkEmail(val),
      (val) => this.checkCountry(val),
      (val) => this.checkPhone(val),
      (val) => this.checkPassword(val),
      (val) => this.checkConfirmPassword(val),
    ];

    requiredParams.map((param, index) => {
      // Check APi and empty here
      if (fnxParams[index](param) && this.checkEmpty(param)) {
        // If right
        this.registerFxnOnEvent(index)(true);
      } else {
        // If anything wrong
        allTrue = false;
        this.registerFxnOnEvent(index)(false);
      }
    });

    // Check if all were right
    if (allTrue) {
      // Goto Second Step
      let csrf_store;

      // If no cookies then stop execution here
      if (getCookie("csrftoken")) {
        csrf_store = getCookie("csrftoken");
      } else {
        this.setState({ showFirstError: true });
        this.setState({ isLoading: false });
        return;
      }

      let regData = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.emailAddress,
        password: this.state.password,
        profile: {
          country: this.state.country,
          phone_number: this.state.countryPhoneCode + this.state.phone,
        },
      };

      // API handles here
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf_store,
        },
        body: JSON.stringify(regData),
      })
        .then((response) => {
          if (response.status === 201) {
            this.setState({ isFirstStepAllRight: true });
          }
          return response.json();
        })
        .then((response) => {
          // If all right
          // We get token here
          if (this.state.isFirstStepAllRight) {
            // IF right set recieved token here
            this.setState({ userToken: JSON.parse(response).token });
            this.setState({ showFirstError: false });
            setTimeout(() => {
              this.setState({ swipeIndex: 1 });
            }, 1000);
            // Disable all options
            this.setState({ isFirstStepAllRight: true });
          } else {
            // If wrong
            if (response.hasOwnProperty("first_name"))
              this.setState({ isFirstNameCorrect: false });
            if (response.hasOwnProperty("last_name"))
              this.setState({ isLastNameCorrect: false });
            if (response.hasOwnProperty("email"))
              this.setState({ isEmailCorrect: false });
            if (response.hasOwnProperty("username"))
              this.setState({ isUsernameCorrect: false });
            if (response.hasOwnProperty("password"))
              this.setState({ isPasswordCorrect: false });
            // Profile error
            if (response.hasOwnProperty("profile")) {
              if (response.profile.hasOwnProperty("phone_number"))
                this.setState({ isPhoneCorrect: false });
              if (response.profile.hasOwnProperty("country"))
                this.setState({ isCountryCorrect: false });
              if (response.profile.hasOwnProperty("detail"))
                this.setState({ showFirstError: true });
            }
            if (response.hasOwnProperty("detail"))
              this.setState({ showFirstError: true });
          }
        })
        .catch(this.setState({ showFirstError: true }));
    } else {
      if (this.state.isFirstStepAllRight)
        this.setState({ isFirstStepAllRight: false });
    }
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  };

  // API and All Registration first step Check Here
  checkFirstName = (name) => {
    if (name.length < 2) return false;
    return true;
  };

  checkLastName = (name) => {
    if (name.length < 2) return false;
    return true;
  };

  checkUsername = (userName) => {
    if (userName.length < 6) return false;
    return true;
  };

  checkEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  checkCountry = (country) => {
    if (typeof country === undefined || country === "" || country === undefined)
      return false;
    return true;
  };

  checkPhone = (phone) => {
    if (isNaN(Number(phone))) return false;
    return true;
  };

  checkPassword = (password) => {
    if (password.length < 8) return false;
    return true;
  };

  checkConfirmPassword = (confirmPass) => {
    if (confirmPass === this.state.password) return true;
    return false;
  };

  // To check if any of them is undefined or not written
  registerFxnOnEvent = (index) => {
    let fxns = [
      (val) => this.setState({ isFirstNameCorrect: val }),
      (val) => this.setState({ isLastNameCorrect: val }),
      (val) => this.setState({ isUsernameCorrect: val }),
      (val) => this.setState({ isEmailCorrect: val }),
      (val) => this.setState({ isCountryCorrect: val }),
      (val) => this.setState({ isPhoneCorrect: val }),
      (val) => this.setState({ isPasswordCorrect: val }),
      (val) => this.setState({ isConfirmPasswordCorrect: val }),
    ];
    return fxns[index];
  };

  // Same empty check
  checkEmpty = (param) => {
    switch (param) {
      case "":
      case null:
      case "null":
      case undefined:
      case "undefined":
        return false;
      // If all Correct then next
      default:
        return true;
    }
  };

  // State Handlers
  handleFirstName = (value) => this.setState({ first_name: value });
  handleLastName = (value) => this.setState({ last_name: value });
  handleUserName = (value) => this.setState({ username: value });
  handleEmail = (value) => this.setState({ emailAddress: value });
  handleCountry = (countryName) => this.setState({ country: countryName });
  handlePhone = (value) => this.setState({ phone: value });
  handlePassword = (value) => this.setState({ password: value });
  handleConfirmPassword = (value) => this.setState({ confirmPassword: value });
  handleCountryPhoneCode = (telCode) => {
    this.setState({ countryPhoneCode: telCode });
  };

  // To hide or show password
  handleVisibility = () => {
    this.setState((state) => ({
      isPasswordShown: !state.isPasswordShown,
    }));
  };

  // Second Step Methods
  render() {
    return (
      <section className="login">
        <Helmet>
          <title>Registration | Kul</title>
        </Helmet>

        <div className="animated">
          <AnimatedBackground />
        </div>

        <div className="registerForm">
          {this.state.isLoading ? <LinearProgBar /> : ""}

          {/* Vertical Stepper */}
          <div className="stepper">
            <VerticalLinearStepper index={this.state.swipeIndex} />
          </div>

          <Swipe index={this.state.swipeIndex} disabled>
            {/* First Step Regiatration */}

            <FirstStep
              classlist={this.classes}
              firstname={this.state.first_name}
              lastname={this.state.last_name}
              isFirstNameCorrect={this.state.isFirstNameCorrect}
              isLastNameCorrect={this.state.isLastNameCorrect}
              emailAddress={this.state.emailAddress}
              isEmailCorrect={this.state.isEmailCorrect}
              country={this.state.country}
              isCountryCorrect={this.state.isCountryCorrect}
              countryPhoneCode={this.state.countryPhoneCode}
              phone={this.state.phone}
              isPhoneCorrect={this.state.isPhoneCorrect}
              password={this.state.password}
              isPasswordCorrect={this.state.isPasswordCorrect}
              confirmPassword={this.state.confirmPassword}
              isConfirmPasswordCorrect={this.state.isConfirmPasswordCorrect}
              isFirstStepAllRight={this.state.isFirstStepAllRight}
              geoLocation={this.state.geoLocation}
              geoPhoneCode={this.state.geoPhoneCode}
              setFirstName={this.handleFirstName}
              setLastName={this.handleLastName}
              setEmail={this.handleEmail}
              setCountry={this.handleCountry}
              setPhone={this.handlePhone}
              setPassword={this.handlePassword}
              setConfirmPassword={this.handleConfirmPassword}
              togglePWVisible={this.handleVisibility}
              setPhoneCode={this.handleCountryPhoneCode}
              firstNextClick={this.handleRegisterFirst}
              isPasswordShown={this.state.isPasswordShown}
              username={this.state.username}
              isUsernameCorrect={this.state.isUsernameCorrect}
              setUsername={this.handleUserName}
              showError={this.state.showFirstError}
            />

            <SecondStep
              classlist={this.classes}
              email={this.state.emailAddress}
              phone={this.state.phone}
              phoneCode={this.state.countryPhoneCode}
              toggleLoader={this.showHideLoader}
              setSwipe={this.handleSwipe}
              isFirstRight={this.state.isFirstStepAllRight}
              token={this.state.userToken}
            />

            <ThirdStep
              classlist={this.classes}
              changeSwipe={this.handleSwipe}
              toggleLoader={this.showHideLoader}
            />
          </Swipe>
        </div>
      </section>
    );
  }
}

export default withStyles(RegisterStyling)(Login);
