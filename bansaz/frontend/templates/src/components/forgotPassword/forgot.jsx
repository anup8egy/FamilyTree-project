import React, { Component } from "react";
import {
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Radio,
  LinearProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AnimatedBackground from "../animatedBackground";
import Swipe from "react-swipeable-views";
import { Helmet } from "react-helmet";
import "../../style/login.css";
// pics
import ForgotIcon from "../../pics/risk.png";
import DoneIcon from "../../pics/correct.png";
// icons
import { FiberManualRecord, AlternateEmail, Report } from "@material-ui/icons";
import { Link } from "react-router-dom";
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
  outlined: {
    border: "1px solid rgba(197, 180, 180, 0.62)",
    padding: "3px 20px",
  },
  toolTipper: {
    fontSize: "0.8em",
  },
  buttonDisabled: {
    color: "#a0a7a09e !important",
    border: "1px solid rgba(244, 240, 240, 0.23)",
  },
  outlined: {
    border: "1px solid rgba(197, 180, 180, 0.62)",
    padding: "3px 20px",
  },
});
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length >= 2) return parts.pop().split(";").shift();
}
class ForgotPassword extends Component {
  state = {
    radioValue: 0,
    email: "",
    isSendCorrect: true,
    isMailCorrect: true,
    isLoading: false,
    swipeIndex: 0,
    showMailError: false,
    showResendError: false,
    isMailSending: false,
    isReMailSending: false,
  };
  handleEmail = (method) => {
    this.setState({ isLoading: true });
    if (method === "resend") {
      this.setState({ isReMailSending: true });
    } else {
      this.setState({ isMailSending: true });
    }
    if (this.checkMail()) {
      // IF mail check correct
      let apiFetchData = { email: this.state.email };
      fetch("/api/auth/request-forget-password-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(apiFetchData),
      })
        .then((response) => {
          // Disable all
          if (response.status === 200) {
            this.setState({ isSendCorrect: true });
          } else if (response.status === 404) {
            this.setState({ isMailCorrect: false });
            this.setState({ isSendCorrect: false });
          } else {
            this.setState({ isSendCorrect: false });
            if (method === "resend") {
              this.setState({ showResendError: true });
            } else {
              this.setState({ showMailError: true });
            }
          }
          return response.json();
        })
        .then((resp) => {
          this.setState({isReMailSending:false})
          setTimeout(() => {
            setTimeout(() => this.setState({ isLoading: false }), 1000);
            if (this.state.isSendCorrect) {
              // If everything is right
              if (method === "resend") {
                this.setState({ showResendError: false });
              } else {
                this.setState({ showMailError: false });
                this.setState({ swipeIndex: 1 });
              }
              this.setState({ isMailCorrect: true });

              if (method !== "resend") this.setState({ swipeIndex: 1 });
            } else {
              if (method === "resend") {
                this.setState({ isReMailSending: false });
              } else {
                this.setState({ isMailSending: false });
              }
            }
          }, 1000);
        })
        .catch((err) => {
          this.setState({ isReMailSending: false });
          this.setState({ isMailSending: false });
          this.setState({ showMailError: true });
          this.setState({ isLoading: false });
        });
    } else {
      // IF mail check failed
      this.setState({ isMailSending: false });
      this.setState({ isLoading: false });
      this.setState({ isMailCorrect: false });
    }
  };
  checkMail = () => {
    // Check mail regex
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) return false;
    // Request to API here
    return true;
  };
  render() {
    return (
      <section className="login">
        <Helmet>
          <title>Account Recovery | Kul</title>
        </Helmet>
        <div className="animated">
          <AnimatedBackground />
        </div>
        <div className="forgotForm">
          <section>{this.state.isLoading ? <LinearProgBar /> : ""}</section>
          <Swipe index={this.state.swipeIndex} disabled>
            {/* email enter here */}
            <div className="swipeItem">
              <span
                style={{
                  fontSize: "1.3em",
                  color: "#dcd2d2",
                  display: "inline-flex",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <FiberManualRecord />
                Account Recovery
              </span>
              <div className="Avatar">
                <Avatar
                  classes={{
                    root: this.props.classes.avatar,
                    img: this.props.classes.img,
                  }}
                  alt="USER"
                  src={ForgotIcon}
                />
              </div>
              <div className="uId">
                <TextField
                  label="Email"
                  placeholder="Enter your email address"
                  helperText={
                    this.state.isMailCorrect
                      ? ""
                      : "This email is'nt associated with Kul"
                  }
                  disabled={this.state.isMailSending}
                  error={!this.state.isMailCorrect}
                  classes={{
                    root: this.props.classes.textField,
                  }}
                  value={this.state.email}
                  onKeyUp={(e) => {
                    e.preventDefault();
                    if (e.keyCode === 13) this.handleEmail("send");
                  }}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {this.state.showMailError ? (
                <div className="err">
                  <Report /> Sorry! Couldn't process the request.{" "}
                </div>
              ) : (
                ""
              )}
              <div className="controlBar">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleEmail("send")}
                  disabled={this.state.isMailSending}
                >
                  Next
                </Button>
              </div>
              <div className="instead">
                <Link to="/login">Login Instead</Link>
              </div>
            </div>
            {/* Email sent and resend here */}
            <div className="swipeItem reg3">
              <div className="Avatar">
                <Avatar
                  classes={{
                    root: this.props.classes.avatar,
                    img: this.props.classes.img,
                  }}
                  alt="USER"
                  src={DoneIcon}
                />
              </div>
              <div className="info">
                <span>A password reset link has been sent to your email.</span>
                <span style={{ fontSize: "0.8em" }}>
                  {" "}
                  If you didn't find in Inbox,check the spam folder.
                </span>
              </div>
              <span style={{ display: "flex", alignItems: "center" }}>
                Didn't recieve mail.
                <Button
                  color="primary"
                  onClick={() => this.handleEmail("resend")}
                  disabled={this.state.isReMailSending}
                >
                  Resend
                </Button>
              </span>
              {this.state.showResendError ? (
                <div className="err">
                  <Report /> Sorry! Couldn't process the request.{" "}
                </div>
              ) : (
                ""
              )}
              <span>
                <span style={{ fontSize: "1em" }}>Note:</span>
                <span style={{ fontSize: "0.8em" }}>
                  Maximum 5 password reset mails per day.
                </span>
              </span>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.isReMailSending}
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </Swipe>
        </div>
      </section>
    );
  }
}
const CustomRadio = withStyles({
  root: {
    color: "#9fa59f",
    "&$checked": {
      color: "#c9d2c9",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
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

export default withStyles(useStyles)(ForgotPassword);
