import React, { Component } from "react";
import { Dialog, IconButton, Avatar, withStyles } from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

// Styles
import __Style from "./style";
import "./style.css";

class PictureViewer extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.onClose(false)}
        maxWidth="lg"
        classes={{ paper: this.props.classes.paper }}
      >
        {/* Close Icon */}

        <div className="img__viewer_close_bar">
          <Avatar classes={{ root: this.props.classes.close_avatar }}>
            <IconButton onClick={() => this.props.onClose(false)}>
              <CloseIcon style={{ color: "#b0a9a9" }} />
            </IconButton>
          </Avatar>
        </div>

        <img src={this.props.src} alt="Profile Picture" />
      </Dialog>
    );
  }
}

export default withStyles(__Style)(PictureViewer);
