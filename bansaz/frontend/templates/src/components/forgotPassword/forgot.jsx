import React, { Component } from "react";
import {
  Avatar,
  Button,
  Fab,
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
import EmailICon from "../../pics/email.png";
import ForgotIcon from "../../pics/risk.png";
// icons
import {
  Drafts,
  FiberManualRecord,
  Send,
  AlternateEmail,
} from "@material-ui/icons";
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
});
class ForgotPassword extends Component {
  state = {
    radioValue: 0,
    email: "",
    isMailCorrect: true,
    isLoading: false,
    swipeIndex: 0,
  };
  getShortEmail = (value) => {
    let whereisAT = value.indexOf("@");
    let firstPart = value.slice(0, whereisAT < 3 ? whereisAT : 3);
    let secondPart = value.slice(whereisAT, value.length);
    return `${firstPart}...${secondPart}`;
  };
  sendMail = () => {
    this.setState({ isLoading: true });
    if (this.state.radioValue === 0) {
      // send mail
      setTimeout(() => {
        this.setSwipe(2);
        this.toggleLoader(false);
      }, 1000);
    } else {
      // Send code on phone
    }
  };
  handleEmail = () => {
    this.setState({ isLoading: true });
    // IF mail check failed
    if (!this.checkMail()) {
      this.setState({ isMailCorrect: false });
    } else {
      this.setState({ isMailCorrect: true });
      this.setState({ swipeIndex: 1 });
    }
    setTimeout(() => this.setState({ isLoading: false }), 1000);
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
                  marginTop: 20,
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
                  error={!this.state.isMailCorrect}
                  classes={{
                    root: this.props.classes.textField,
                  }}
                  value={this.state.email}
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
              <div className="controlBar">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleEmail}
                >
                  Next
                </Button>
              </div>
              <div className="instead">
                <Link to="/login">Login Instead</Link>
              </div>
            </div>
            {/* Send Email here */}
            <div className="swipeItem">
              <div className="Avatar">
                <Avatar
                  classes={{
                    root: this.props.classes.avatar,
                    img: this.props.classes.img,
                  }}
                  alt="USER"
                  src={EmailICon}
                />
              </div>
              <div>
                <Button
                  variant="outlined"
                  classes={{
                    root: this.props.classes.button,
                    outlined: this.props.classes.outlined,
                  }}
                  onClick={() =>
                    this.state.radioValue === 0
                      ? null
                      : this.setState({ radioValue: 0 })
                  }
                  disableRipple
                >
                  <Drafts />
                  Send verification code to:
                  {this.getShortEmail(this.state.email)}
                  <CustomRadio
                    checked={this.state.radioValue === 0}
                    name="send"
                  />
                </Button>
              </div>
              <div></div>
              <div style={{ justifySelf: "flex-end", marginRight: 10 }}>
                <Fab variant="extended" onClick={this.sendMail}>
                  Send
                  <Send />
                </Fab>
              </div>
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
