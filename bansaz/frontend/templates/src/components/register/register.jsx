import React, { Component } from "react";
import clsx from "clsx";
import "../../style/login.css";
import {
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AnimatedBackground from "../animatedBackground";
import Swipe from "react-swipeable-views";
// Icons
import { HowToReg, AllInbox, VerifiedUser } from "@material-ui/icons";
// Pics
// Components
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import { Helmet } from "react-helmet";
const useStyles = () => ({
  avatar: {
    height: 150,
    width: 150,
    background: "#dedada0f",
  },
  img: {
    width: "auto",
    height: "50%",
  },
  textField: {
    maxWidth: 240,
    minWidth: 240,
    "& label": {
      color: "#bfb9b9ed",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline::before": {
      borderBottom: "1px solid rgba(130, 125, 125, 0.42)",
    },
    "& .MuiInput-underline::after": {
      borderBottom: "1px solid rgba(205, 198, 198, 0.64)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled)::before": {
      borderBottom: "1px solid rgba(197, 191, 191, 0.87)",
    },
    "& .MuiInputBase-root": {
      color: "rgba(211, 200, 200, 0.87)",
    },
    "& p": {
      color: "rgba(189, 182, 182, 0.7)",
    },
  },
  customCheckBox: {
    color: "#afb3d3 !important",
  },
  button: {
    color: "#b8b8b8",
    fontSize: "0.8em",
    maxWidth: 280,
    minWidth: 280,
    textTransform: "none",
  },
  buttonDisabled: {
    color: "#a0a7a09e !important",
    border: "1px solid rgba(244, 240, 240, 0.23)",
  },
  outlined: {
    border: "1px solid rgba(197, 180, 180, 0.62)",
    padding: "3px 20px",
  },
  toolTipper: {
    fontSize: "0.8em",
  },
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
  }
  state = {
    swipeIndex: 0,
    isLoading: false,
    name: "",
    isNameCorrect: true,
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
    this.setState({ geoLocation: "NP" });
    this.setState({ geoPhoneCode: "977" });
  };
  // First when user clicks Next
  handleRegisterFirst = () => {
    // To show loader on top
    let allTrue = true;
    this.setState({ isLoading: true });
    // Check if Full Name empty
    let requiredParams = [
      this.state.name,
      this.state.emailAddress,
      this.state.country,
      this.state.phone,
      this.state.password,
      this.state.confirmPassword,
    ];
    let fnxParams = [
      (val) => this.checkName(val),
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
      setTimeout(() => {
        this.setState({ swipeIndex: 1 });
      }, 1000);
      // Disable all options
      if (!this.state.isFirstStepAllRight)
        this.setState({ isFirstStepAllRight: true });
    } else {
      if (this.state.isFirstStepAllRight)
        this.setState({ isFirstStepAllRight: false });
    }
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  };
  // API and All Registration first step Check Here
  checkName = (name) => {
    if (name.length < 4) return false;
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
      (val) => this.setState({ isNameCorrect: val }),
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
  handleName = (value) => this.setState({ name: value });
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
    console.log("Clicked");
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
          <Swipe index={this.state.swipeIndex}>
            {/* First Step Regiatration */}
            <FirstStep
              classlist={this.classes}
              name={this.state.name}
              isNameCorrect={this.state.isNameCorrect}
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
              setName={this.handleName}
              setEmail={this.handleEmail}
              setCountry={this.handleCountry}
              setPhone={this.handlePhone}
              setPassword={this.handlePassword}
              setConfirmPassword={this.handleConfirmPassword}
              togglePWVisible={this.handleVisibility}
              setPhoneCode={this.handleCountryPhoneCode}
              firstNextClick={this.handleRegisterFirst}
              isPasswordShown={this.state.isPasswordShown}
            />
            <SecondStep
              classlist={this.classes}
              email={this.state.emailAddress}
              phone={this.state.phone}
              phoneCode={this.state.countryPhoneCode}
              toggleLoader={this.showHideLoader}
              setSwipe={this.handleSwipe}
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
const LinearProgBar = withStyles((theme) => ({
  root: {
    height: 3,
    maxHeight: 3,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  colorPrimary: {
    backgroundColor: "#393939",
  },
  bar: {
    backgroundColor: "#b9c2cb",
  },
}))(LinearProgress);

const stepStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  stepper: {
    padding: "0px",
    backgroundColor: "transparent",
  },
}));

function VerticalLinearStepper(props) {
  const classes = stepStyles();
  const { index } = props;
  const steps = [0, 1, 2];

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={index}
        orientation="vertical"
        classes={{ root: classes.stepper }}
        connector={<CustomStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: "#a69f9f73",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40414a",
    marginLeft: 3,
  },
  active: {
    backgroundColor: "#202f817a",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    color: "#dad0d0",
    width: 47,
    height: 47,
    marginLeft: 0,
  },
  completed: {
    backgroundColor: "#071354d4",
    color: "white",
    height: 55,
    width: 55,
    marginLeft: -2,
  },
});
const CustomStepConnector = withStyles({
  alternativeLabel: {
    left: 30,
  },
  active: {
    "& $line": {
      backgroundColor: "#c2c2c2ed",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#071354d4",
    },
  },
  line: {
    height: 3,
    border: 0,
    width: 3,
    backgroundColor: "#a5a5a66e",
    borderRadius: 1,
    position: "relative",
    left: 10,
  },
  vertical: {
    padding: 0,
  },
})(StepConnector);
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <HowToReg />,
    2: <AllInbox />,
    3: <VerifiedUser />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

export default withStyles(useStyles)(Login);
