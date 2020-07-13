import React, { Component } from "react";
import { Dialog, IconButton, Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import "../../style/univ_component/profilepic.css";
const usestyles = () => ({
  paper: {
    minHeight: "70vh",
    minWidth: "70vw",
    background: "#090909",
    boxShadow: "-1px 1px 20px 0px #171616c4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  close_avatar: {
    background: "#201f1f",
  },
});
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

export default withStyles(usestyles)(PictureViewer);
