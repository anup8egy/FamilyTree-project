import React, { Component } from "react";
import { Avatar, Button, Fab, Radio, Tooltip } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// pics
import VerifyIcon from "../../pics/verified.png";
// icons
import { Drafts, Textsms, Send } from "@material-ui/icons";
const ButtonStyle = makeStyles(() => ({}));
class SecondStep extends Component {
  constructor(props) {
    super(props);
    this.toggleLoader = this.props.toggleLoader;
    this.setSwipe = this.props.setSwipe;
  }
  state = {
    radioValue: 0,
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
