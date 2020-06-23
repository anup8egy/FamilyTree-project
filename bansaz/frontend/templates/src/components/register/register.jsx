import React, { Component } from "react";
import "../../style/login.css";
import {
  Avatar,
  TextField,
  InputAdornment,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AnimatedBackground from "../animatedBackground";
import { Link } from "react-router-dom";
import Swipe from "react-swipeable-views";
// Icons
import { Person, AlternateEmail } from "@material-ui/icons";
// Pics
import RegisterLogo from "../../pics/settings.png";
import SettingsLogo from "../../pics/add.png";
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
  },
  customCheckBox: {
    color: "#afb3d3 !important",
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
    userName: "",
    isUserCorrect: true,
    password: "",
    isPasswordCorrect: true,
    isUserFieldDisabled: false,
    isPasswordFieldDisbaled: false,
    isLoginRememberChecked: true,
  };
  handleUserID = () => {
    // To show loader on top
    this.setState({ isLoading: true });
    // Check if username empty
    switch (this.state.userName) {
      case "":
      case null:
      case "null":
      case undefined:
      case "undefined":
        this.setState({ isLoading: false });
        this.setState({ isUserCorrect: false });
        break;
      // If all Correct then next
      default:
        setTimeout(() => {
          this.setState({ isUserFieldDisabled: true });
          this.setState({ swipeIndex: 1 });
          this.setState({ isLoading: false });
        }, 1000);
        break;
    }
  };
  handlePassword = () => {
    // To show loader on top
    this.setState({ isLoading: true });
    // Check if username empty
    switch (this.state.password) {
      case "":
      case null:
      case "null":
      case undefined:
      case "undefined":
        this.setState({ isLoading: false });
        this.setState({ isPasswordCorrect: false });
        break;
      // If all Correct then next
      default:
        setTimeout(() => {
          this.setState({ isPasswordFieldDisbaled: true });
          this.setState({ isLoading: false });
          alert("Redirecting to Login Page");
        }, 1000);
        break;
    }
  };

  render() {
    return (
      <section className="login">
        <div className="animated">
          <AnimatedBackground />
        </div>
        <div className="loginForm">
          {this.state.isLoading ? <LinearProgBar /> : ""}
          <Swipe index={this.state.swipeIndex}>
            {/* User ID */}
            <div className="swipeItem">
              <div className="Avatar">
                <Avatar
                  classes={{ root: this.classes.avatar, img: this.classes.img }}
                  alt="USER"
                  src={SettingsLogo}
                />
              </div>
              {/* Full Name Here */}
              <div className="uId">
                <TextField
                  label="Full Name"
                  placeholder="Enter Full Name"
                  classes={{
                    root: this.classes.textField,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* Email Address Here */}
              <div className="uId">
                <TextField
                  label="Email"
                  placeholder="Enter email address"
                  classes={{
                    root: this.classes.textField,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="uId"></div>
              <div className="controlBar">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleUserID}
                >
                  Next
                </Button>
              </div>
              <div className="accountOptions">
                <Link to="/forogotAccount">Forgot account</Link>
                <Link to="/register">Create Account</Link>
              </div>
            </div>
            {/* User password */}
            <div className="swipeItem">
              <div className="Avatar">
                <Avatar
                  classes={{ root: this.classes.avatar, img: this.classes.img }}
                  alt="USER"
                  src={RegisterLogo}
                />
              </div>
              <div className="uId">
                <TextField
                  disabled={this.state.isPasswordFieldDisbaled}
                  helperText={
                    !this.state.isPasswordCorrect ? "Incorrect Password" : ""
                  }
                  error={!this.state.isPasswordCorrect}
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  label="Password"
                  placeholder="Enter Password"
                  classes={{
                    root: this.classes.textField,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="controlBar">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handlePassword}
                >
                  Login
                </Button>
              </div>
              <div className="accountOptions">
                <Link to="/forogotPassword">Forgot password</Link>
              </div>
            </div>
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
  },
  colorPrimary: {
    backgroundColor: "#393939",
  },
  bar: {
    backgroundColor: "#b9c2cb",
  },
}))(LinearProgress);
export default withStyles(useStyles)(Login);