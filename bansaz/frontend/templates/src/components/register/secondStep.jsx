import React, { Component } from "react";
import { Avatar, Button, Fab, Radio, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// pics
import VerifyIcon from "../../pics/verified.png";
// icons
import { Drafts, Textsms, Send, Report } from "@material-ui/icons";
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length >= 2) return parts.pop().split(";").shift();
}
class SecondStep extends Component {
  constructor(props) {
    super(props);
    this.toggleLoader = this.props.toggleLoader;
    this.setSwipe = this.props.setSwipe;
  }
  state = {
    radioValue: 0,
    showError: false,
    isAllRight: false,
  };
  getShortEmail = (value) => {
    let whereisAT = value.indexOf("@");
    let firstPart = value.slice(0, whereisAT < 3 ? whereisAT : 3);
    let secondPart = value.slice(whereisAT, value.length);
    return `${firstPart}...${secondPart}`;
  };
  getShortPhone = (value) => {
    return `${String(value).slice(0, 3)}....`;
  };
  sendMail = () => {
    this.toggleLoader(true);
    let csrf_store;
    // If no cookies then stop execution here
    if (getCookie("csrftoken")) {
      csrf_store = getCookie("csrftoken");
    } else {
      this.setState({ showFirstError: true });
      this.setState({ isLoading: false });
      return;
    }
    let emailVerParam = { token: this.props.token };
    if (this.state.radioValue === 0) {
      // send mail
      fetch("/api/auth/request-email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf_store,
        },
        body: JSON.stringify(emailVerParam),
      })
        .then((response) => {
          if (response.status === 200) this.setState({ isAllRight: true });
          else this.setState({ isAllRight: false });
          return response.json();
        })
        .then((response) => {
          setTimeout(() => {
            this.toggleLoader(false);
          }, 1000);
          if (this.state.isAllRight) {
            this.setSwipe(2);
          } else {
            this.setState({ showError: true });
          }
        })
        .catch((err) => {
          this.setState({ showError: true });
          setTimeout(() => {
            this.toggleLoader(false);
          }, 1000);
        });
    } else {
      // Send code on phone
    }
  };
  render() {
    return (
      <div className="swipeItem reg2">
        <div className="Avatar">
          <Avatar
            classes={{
              root: this.props.classlist.avatar,
              img: this.props.classlist.img,
            }}
            alt="USER"
            src={VerifyIcon}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            classes={{
              root: this.props.classlist.button,
              outlined: this.props.classlist.outlined,
            }}
            onClick={() =>
              this.state.radioValue === 0
                ? null
                : this.setState({ radioValue: 0 })
            }
            disableRipple
          >
            <Drafts />
            Send verification code to {this.getShortEmail(this.props.email)}
            <GreenRadio checked={this.state.radioValue === 0} name="send" />
          </Button>
        </div>
        <div>
          <Tooltip
            title="Unavailable now"
            classes={{ tooltip: this.props.classlist.toolTipper }}
          >
            <div>
              <Button
                variant="outlined"
                classes={{
                  root: this.props.classlist.button,
                  outlined: this.props.classlist.outlined,
                  disabled: this.props.classlist.buttonDisabled,
                }}
                disableRipple
                onClick={() =>
                  this.state.radioValue === 1
                    ? null
                    : this.setState({ radioValue: 1 })
                }
                disabled={true}
              >
                <Textsms />
                Send verification code to +
                {this.props.phoneCode + this.getShortPhone(this.props.phone)}
                <GreenRadio checked={this.state.radioValue === 1} name="send" />
              </Button>
            </div>
          </Tooltip>
        </div>
        {this.state.showError ? (
          <div className="err">
            <Report />
            Sorry! Couldn't process this request
          </div>
        ) : (
          ""
        )}
        <div>
          <Fab variant="extended" onClick={this.sendMail}>
            Send
            <Send />
          </Fab>
        </div>
      </div>
    );
  }
}
const GreenRadio = withStyles({
  root: {
    color: "#9fa59f",
    "&$checked": {
      color: "#c9d2c9",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
export default SecondStep;
