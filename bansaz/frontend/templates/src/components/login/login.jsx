import React, { Component } from "react";
import "../../style/login.css";
import {
  Avatar,
  TextField,
  InputAdornment,
  Button,
  LinearProgress,
  Checkbox,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AnimatedBackground from "../animatedBackground";
import { Link } from "react-router-dom";
import Swipe from "react-swipeable-views";
import {Helmet} from "react-helmet"
// Icons
import { Person } from "@material-ui/icons";
// Pics
import UserLogo from "../../pics/password.png";
import KeyLogo from "../../pics/smart-key.png";
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
        // Send Request to API
        this.sendRequestToUserLogin();
        setTimeout(() => {
          // this.setState({ isUserFieldDisabled: true });
          // this.setState({ swipeIndex: 1 });
          this.setState({ isLoading: false });
        }, 1000);
        break;
    }
  };
  sendRequestToUserLogin = () => {
    let userCredentials
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.state.username)) userCredentials = { email: this.state.userName };  
    else userCredentials={username=this.state.userName}  
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((val) => val.json())
      .then((val) => console.log(val))
      .catch((err) => console.log(err));
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
        <Helmet>
          <title>Login | Kul</title>
        </Helmet>
        <div className="animated">
          <AnimatedBackground />
        </div>
        <div className="loginForm">
          {this.state.isLoading ? <LinearProgBar /> : ""}
          <Swipe index={this.state.swipeIndex} disabled>
            {/* User ID */}
            <div className="swipeItem">
              <div className="Avatar">
                <Avatar
                  classes={{ root: this.classes.avatar, img: this.classes.img }}
                  alt="USER"
                  src={UserLogo}
                />
              </div>
              <div className="uId">
                <TextField
                  disabled={this.state.isUserFieldDisabled}
                  label="User Id"
                  error={!this.state.isUserCorrect}
                  helperText={
                    !this.state.isUserCorrect ? "Invalid username" : ""
                  }
                  placeholder="Username or Email"
                  classes={{
                    root: this.classes.textField,
                  }}
                  value={this.state.userName}
                  onChange={(e) => this.setState({ userName: e.target.value })}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="remember">
                {/* For remembering Login Data */}
                <Checkbox
                  checked={this.state.isLoginRememberChecked}
                  indeterminate
                  name="Remember Login"
                  classes={{ checked: this.classes.customCheckBox }}
                  onChange={() =>
                    this.setState((prev) => ({
                      isLoginRememberChecked: !prev.isLoginRememberChecked,
                    }))
                  }
                />
                Keep logged in
              </div>
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
                <Link to="/forgot">Forgot account</Link>
                <Link to="/register">Create Account</Link>
              </div>
            </div>
            {/* User password */}
            <div className="swipeItem">
              <div className="Avatar">
                <Avatar
                  classes={{ root: this.classes.avatar, img: this.classes.img }}
                  alt="USER"
                  src={KeyLogo}
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
              {/* <div className="accountOptions">
                <Link to="/forgot">Forgot password</Link>
              </div> */}
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
