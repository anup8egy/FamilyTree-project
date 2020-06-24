import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
// Pics
import VerifiedIcon from "../../pics/shield.png";
class ThirdStep extends Component {
  constructor(props) {
    super(props);
    this.changeSwipe = this.props.changeSwipe;
    this.toggleLoader = this.props.toggleLoader;
  }
  // When clicked on resend
  handlePrevious = () => {
    this.toggleLoader(true);
    setTimeout(() => {
      this.toggleLoader(false);
      this.changeSwipe(1);
    }, 1000);
  };
  render() {
    return (
      <div className="swipeItem reg3">
        <div className="Avatar">
          <Avatar
            classes={{
              root: this.props.classlist.avatar,
              img: this.props.classlist.img,
            }}
            alt="USER"
            src={VerifiedIcon}
          />
        </div>
        <div className="info">
          <span>A confirmation link has been sent to your email.</span>
          <span style={{ fontSize: "0.8em" }}>
            {" "}
            If you didn't find in Inbox,check the spam folder.
          </span>
        </div>
        <span style={{ display: "flex", alignItems: "center" }}>
          Didn't recieve mail.
          <Button color="primary" onClick={this.handlePrevious}>
            Resend
          </Button>
        </span>
        <span>
          <span style={{ fontSize: "1em" }}>Note:</span>
          <span style={{ fontSize: "0.8em" }}>
            Maximum 5 confirmation mails per day.
          </span>
        </span>
        <Button variant="contained" color="primary">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    );
  }
}
export default ThirdStep;
