import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  Tooltip,
  Zoom,
  Menu,
} from "@material-ui/core";

// Icons
import {
  Add as AddIcon,
  Search as SearchIcon,
  ArrowDropDown as DownIcon,
  Notifications as NotificationIcon,
} from "@material-ui/icons";

import ProfileContent_Nav from "./__dropDown_PROFILE";
import Notification_DropDown from "./__dropDown_NOTIFICATION";
import Create_DropDown from "./__dropDown_CREATE";

// Desktop Version
class DesktopnavBar extends React.Component {
  state = {
    isDropDownOpen: false,
    anchorDropDown: null,
    isNotificationsOpen: false,
    anchorNotification: null,
    isCreateOpen: false,
    anchorCreate: null,
  };

  // To open and close dropdown of profile
  handleDropDownOpenClose = (e) => {
    this.setState({ anchorDropDown: e.currentTarget });
    this.setState({ isDropDownOpen: true });
  };

  handleDropDownCreate = (e) => {
    this.setState({ anchorCreate: e.currentTarget });
    this.setState({ isCreateOpen: true });
  };

  handleDropDownNotification = (e) => {
    this.setState({ anchorNotification: e.currentTarget });
    this.setState({ isNotificationsOpen: true });
  };

  render() {
    return (
      <AppBar position="static" classes={{ root: this.props.classes.deskroot }}>
        <Toolbar>
          {/* /Company Logo Desktop */}

          <div className="logo_desktop">
            <Avatar
              src="logo"
              alt="B"
              classes={{ root: this.props.classes.desktop_app_logo_nav }}
            />
          </div>

          {/* Search Bar Desktop */}

          <div className="desktop_search">
            <input type="text" placeholder="Search..." />
            <IconButton classes={{ root: this.props.classes.smallIconsColor }}>
              <SearchIcon />
            </IconButton>
          </div>

          {/* Desktop last functional buttons */}

          <div className="desktop_buttons_functions_nav">
            {/* Create Button Desktop */}
            <div className="create_nav_desktop">
              <Tooltip
                title="Create"
                arrow
                TransitionComponent={Zoom}
                classes={{ tooltip: this.props.classes.desk_nav_tooltip }}
              >
                <IconButton
                  className="desktop_nav_icons"
                  onClick={this.handleDropDownCreate}
                >
                  <Avatar
                    classes={{ root: this.props.classes.desktopnavAvatar }}
                  >
                    <AddIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>

            {/* Notifications Desktop */}

            <div className="desktop_nav_icons">
              <Tooltip
                title="Notifications"
                arrow
                TransitionComponent={Zoom}
                classes={{ tooltip: this.props.classes.desk_nav_tooltip }}
              >
                <IconButton onClick={this.handleDropDownNotification}>
                  <Avatar
                    classes={{ root: this.props.classes.desktopnavAvatar }}
                  >
                    <Badge
                      badgeContent={4}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      max={99}
                      color="primary"
                      classes={{
                        colorPrimary: this.props.classes.notificationBadge,
                      }}
                    >
                      <NotificationIcon />
                    </Badge>
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>

            {/* DropDown Desktop */}

            <div className="dropDown_nav_icons">
              <Tooltip
                title="Profile"
                arrow
                TransitionComponent={Zoom}
                classes={{ tooltip: this.props.classes.desk_nav_tooltip }}
                disableFocusListener
                disableTouchListener
              >
                <IconButton onClick={this.handleDropDownOpenClose}>
                  <Avatar
                    classes={{ root: this.props.classes.desktopnavAvatar }}
                  >
                    <DownIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Toolbar>
        {/* Drop Down Menus */}

        {/* Profile DropDown */}

        <Menu
          anchorEl={this.state.anchorDropDown}
          keepMounted
          open={this.state.isDropDownOpen}
          onClose={() => this.setState({ isDropDownOpen: false })}
          TransitionComponent={Zoom}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          classes={{
            paper: this.props.classes.profilePaper,
            list: this.props.classes.profilePaperList,
          }}
        >
          
          <ProfileContent_Nav {...this.props} mobile={false} />
        </Menu>

        {/* Create DropDown */}

        <Menu
          anchorEl={this.state.anchorCreate}
          keepMounted
          open={this.state.isCreateOpen}
          onClose={() => this.setState({ isCreateOpen: false })}
          TransitionComponent={Zoom}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          classes={{
            paper: this.props.classes.createPaper,
            list: this.props.classes.profilePaperList,
          }}
        >
          <Create_DropDown {...this.props} mobile={false} />
        </Menu>

        {/* Notification DropDown */}

        <Menu
          anchorEl={this.state.anchorNotification}
          keepMounted
          open={this.state.isNotificationsOpen}
          onClose={() => this.setState({ isNotificationsOpen: false })}
          TransitionComponent={Zoom}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          classes={{
            paper: this.props.classes.profilePaper,
            list: this.props.classes.profilePaperList,
          }}
        >
          <Notification_DropDown {...this.props} />
        </Menu>
      </AppBar>
    );
  }
}

export default DesktopnavBar;
