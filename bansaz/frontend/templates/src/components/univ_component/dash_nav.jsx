import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Avatar,
  Badge,
  Tooltip,
  Zoom,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Filter as FilterIcon,
  Add as AddIcon,
  Face as FaceIcon,
  Help as HelpIcon,
  Reply as LogoutIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  ArrowDropDown as DownIcon,
  Notifications as NotificationIcon,
} from "@material-ui/icons";
// Profile Pic
import SampleProfilePic from "../../pics/sample_profile.jpg";

class NavBar_Dash extends Component {
  state = {
    isMobileDevice: true,
  };
  componentDidMount() {
    //   To check whetehr mobile or another then display data based on that
    this.screenCheck();
  }
  screenCheck = () => {
    var isMobileWidth = window.matchMedia("(max-width: 500px)");
    if (isMobileWidth.matches) this.setState({ isMobileDevice: true });
    else this.setState({ isMobileDevice: false });
    isMobileWidth.addListener(this.screenCheck);
  };
  render() {
    return (
      <React.Fragment>
        {/* If mobile then show mobile nav or show desktop */}
        {this.state.isMobileDevice ? (
          <MobileNavBar {...this.props} />
        ) : (
          <DesktopnavBar {...this.props} />
        )}
      </React.Fragment>
    );
  }
}
const useStyles = () => ({
  deskroot: {
    backgroundColor: "#0d0d0d",
    boxShadow: "0px 0px 10px -3px #ffffff4d",
  },
  paper_root: {
    minWidth: "85vw",
    backgroundColor: "#0f0f0f",
    display: "grid",
    gridTemplate: "auto / 1fr",
    alignContent: "baseline",
    justifyItems: "center",
    gridGap: 10,
  },
  icon_ava: {
    color: "#a89a9a",
    backgroundColor: "#222121",
    marginLeft: 10,
  },
  dash_mob_logo: {
    height: 100,
    width: 100,
    backgroundColor: "#24232387",
  },
  profile_pic_nav: {
    height: 80,
    width: 80,
    backgroundColor: "#24232387",
    marginLeft: 10,
  },
  desktop_app_logo_nav: {
    height: 60,
    width: 60,
    backgroundColor: "#24232387",
  },
  smallIconsColor: {
    color: "white",
  },
  desktop_controls: {
    marginRight: 20,
  },
  desktopnavAvatar: {
    color: "#a89a9a",
    backgroundColor: "#222121",
    overflow: "visible",
  },
  notificationBadge: {
    backgroundColor: "#9f0b0b",
  },
  desk_nav_tooltip: {
    backgroundColor: "#404040",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8em",
    minWidth: 90,
    minHeight: 20,
    color: "#cecaca",
  },
  profilePaper: {
    background: "#1c1b1bf2",
    height: 350,
    width: 250,
    padding: "2px 10px",
  },
  profilePaperList: {
    display: "grid",
    gridGap: 3,
    alignContent: "center",
    justifyItems: "center",
  },
});
// Mobile Version
class MobileNavBar extends Component {
  state = {
    isMenuOpen: false,
  };
  handleMenu = (bool_status) => {
    this.setState({ isMenuOpen: Boolean(bool_status) });
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
            <div className="searchBar">
              <input type="text" placeholder="Search..." />
              <div className="search"></div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
// desktop Version
class DesktopnavBar extends Component {
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
                <Link to="/create" className="desktop_nav_icons">
                  <Avatar
                    classes={{ root: this.props.classes.desktopnavAvatar }}
                  >
                    <AddIcon />
                  </Avatar>
                </Link>
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
                <IconButton>
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
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          classes={{
            paper: this.props.classes.profilePaper,
            list: this.props.classes.profilePaperList,
          }}
        >
          <ProfileContent_Nav {...this.props} mobile={false} />
        </Menu>
      </AppBar>
    );
  }
}
//Profile DropDown Component
class ProfileContent_Nav extends Component {
  render() {
    return (
      <React.Fragment>
        <Link
          to="/bimarshbhusal"
          className={
            this.props.mobile
              ? "mob_profile"
              : "mob_profile desktop_nav_buttons_drop"
          }
        >
          <Avatar
            classes={{ root: this.props.classes.profile_pic_nav }}
            src={SampleProfilePic}
            alt="B"
          />
          <div style={{ marginLeft: 10 }}>
            <div className="mob_profile_name_nav">Bimarsh Bhusal</div>
            <div className="mob_profile_name_nav_detail">
              See account details
            </div>
          </div>
        </Link>
        {/* Different Options are here */}
        {/* Create New Mobile */}
        {/* If mobile true then only show */}
        {this.props.mobile ? (
          <Link
            to="/bimarshbhusal"
            className={
              this.props.mobile
                ? "mob_create"
                : "mob_create desktop_nav_buttons_drop"
            }
          >
            <Avatar classes={{ root: this.props.classes.icon_ava }}>
              <AddIcon />
            </Avatar>
            <div className="info_nav">Create New Kul</div>
          </Link>
        ) : (
          ""
        )}
        {/* Account settings Mobile */}
        <Link
          className={
            this.props.mobile
              ? "accountSettings"
              : "accountSettings desktop_nav_buttons_drop"
          }
          to="/account_settings"
        >
          <Avatar classes={{ root: this.props.classes.icon_ava }}>
            <FaceIcon />
          </Avatar>
          <div className="info_nav">Account Settings</div>
        </Link>
        {/* Help Mobile */}
        <Link
          className={
            this.props.mobile ? "help" : "help desktop_nav_buttons_drop"
          }
          to="/help"
        >
          <Avatar classes={{ root: this.props.classes.icon_ava }}>
            <HelpIcon />
          </Avatar>
          <div className="info_nav">Help</div>
        </Link>
        {/* Logout Mobile */}
        <div
          className={
            this.props.mobile ? "logout" : "logout desktop_nav_buttons_drop"
          }
        >
          <Avatar classes={{ root: this.props.classes.icon_ava }}>
            <LogoutIcon />
          </Avatar>
          <div className="info_nav">Logout</div>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(NavBar_Dash);
