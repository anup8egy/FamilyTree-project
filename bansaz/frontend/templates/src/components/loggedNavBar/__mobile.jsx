import React from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  Tooltip,
  Zoom,
  Menu,
} from "@material-ui/core";
import { Link } from "react-router-dom";

// icons
import {
  Menu as MenuIcon,
  Filter as FilterIcon,
  Close as CloseIcon,
  Notifications as NotificationIcon,
} from "@material-ui/icons";

import ProfileContent_Nav from "./__dropDown_PROFILE";
import Notification_DropDown from "./__dropDown_NOTIFICATION";

// Mobile Version
class MobileNavBar extends React.Component {
  state = {
    isMenuOpen: false,
    isNotificationsOpen: false,
    anchorNotification: null,
  };

  handleMenu = (bool_status) => {
    this.setState({ isMenuOpen: Boolean(bool_status) });
  };

  handleDropDownNotification = (e) => {
    this.setState({ anchorNotification: e.currentTarget });
    this.setState({ isNotificationsOpen: true });
  };

  render() {
    return (
      <div className="dash_nav_container">
        <div>
          {/* Side Nav */}

          <Drawer
            anchor="left"
            open={this.state.isMenuOpen}
            onClose={() => this.handleMenu(false)}
            classes={{ paper: this.props.classes.paper_root }}
          >
            {/* close Icon */}

            <div className="closer_nav_mob_dash">
              <IconButton onClick={() => this.handleMenu(false)}>
                <CloseIcon className="menuIcon" />
              </IconButton>
            </div>

            {/* Logo of Company */}

            <Link to="/">
              <div className="mob_logo">
                <Avatar classes={{ root: this.props.classes.dash_mob_logo }}>
                  <FilterIcon />
                </Avatar>
              </div>
            </Link>

            {/* All Contents here */}

            <ProfileContent_Nav {...this.props} mobile={true} />
          </Drawer>
        </div>

        {/* App bar of Mobile */}

        <AppBar
          position="static"
          classes={{ root: this.props.classes.deskroot }}
        >
          <Toolbar>
            <div className="logo_desktop">
              <IconButton disableRipple onClick={() => this.handleMenu(true)}>
                <MenuIcon className="menuIcon" />
              </IconButton>
            </div>

            {/* Mobile notification */}

            <div className="searchBar">
              <input type="text" placeholder="Search..." />
              <div className="desktop_nav_icons mobile_notification">
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
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
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

              <div className="search"></div>
            </div>
          </Toolbar>

          {/* mobile Notification Bar is here */}

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
      </div>
    );
  }
}

export default MobileNavBar;
