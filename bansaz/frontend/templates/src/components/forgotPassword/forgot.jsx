import React, { Component } from "react";
import { Avatar, Button, Fab, Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AnimatedBackground from "../animatedBackground";
import Swipe from "react-swipeable-views";
import { Helmet } from "react-helmet";
import "../../style/login.css";
// pics
import EmailICon from "../../pics/email.png";
import ForgotIcon from "../../pics/risk.png";
// icons
import { Drafts, Send } from "@material-ui/icons";
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
  };
  getShortEmail = (value) => {
    let whereisAT = value.indexOf("@");
    let firstPart = value.slice(0, whereisAT < 3 ? whereisAT : 3);
    let secondPart = value.slice(whereisAT, value.length);
    return `${firstPart}...${secondPart}`;
  };
  sendMail = () => {
    this.toggleLoader(true);
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
  render() {
    return (
      <section className="login">
        <Helmet>
          <title>Registration | Kul</title>
        </Helmet>
        <div className="animated">
          <AnimatedBackground />
        </div>
        <div className="forgotForm">
          {this.state.isLoading ? <LinearProgBar /> : ""}
          <Swipe index={this.state.swipeIndex} disabled>
            <div className="swipeItem">
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
            </div>
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
                  Send verification code to anu..@gmail.com
                  {/* {this.getShortEmail(this.props.email)} */}
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
export default withStyles(useStyles)(ForgotPassword);
