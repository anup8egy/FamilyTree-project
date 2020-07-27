import React from "react";
import { Snackbar, IconButton, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// Icons
import {
  Close as Closeicon,
  ViewWeek as DefaultNotificationSnackIcon,
} from "@material-ui/icons";

// Style
import NotificationStyle from "./styles/notification";

class NotificationTab extends React.Component {
  handleClose = () => {
    this.props.close(false);
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.props.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        message={
          <React.Fragment>
            {this.props.icon ? (
              this.props.icon
            ) : (
              <DefaultNotificationSnackIcon />
            )}
            {this.props.message}
          </React.Fragment>
        }
        classes={{ root: this.props.classes.root }}
        action={
          <IconButton onClick={this.handleClose}>
            <Closeicon />
          </IconButton>
        }
      />
    );
  }
}

NotificationTab.propTypes = {
  icon: PropTypes.element,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(NotificationStyle)(NotificationTab);

// Usage :: <NotificationTabBansaz icon=<Something /> message="Notification" close={callback to close the state} open={this.state.open}/>
