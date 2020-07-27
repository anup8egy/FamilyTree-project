import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";

// Icons
import {
  Add as AddIcon,
  Face as FaceIcon,
  Help as HelpIcon,
  Reply as LogoutIcon,
  NavigateNext as RightArrowIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

//Profile DropDown Component
class ProfileContent_Nav extends React.Component {
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
            src={this.props.profilePic}
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
          <ExpansionPanel
            classes={{ root: this.props.classes.mob_nav_create_drop }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            >
              Create
            </ExpansionPanelSummary>

            <ExpansionPanelDetails
              classes={{ root: this.props.classes.mob_expanded_root }}
            >
              <Link to="/create-clan" className="mob_create">
                <Avatar classes={{ root: this.props.classes.icon_ava }}>
                  <AddIcon />
                </Avatar>
                <div className="info_nav">Create Kul</div>
                <span
                  style={{ position: "absolute", right: 40, color: "#9f9b9b" }}
                >
                  <RightArrowIcon />
                </span>
              </Link>
            </ExpansionPanelDetails>

            <ExpansionPanelDetails
              classes={{ root: this.props.classes.mob_expanded_root }}
            >
              <Link
                to="/create-staff-map"
                className={
                  this.props.mobile
                    ? "mob_create"
                    : "mob_create desktop_nav_buttons_drop"
                }
              >
                <Avatar classes={{ root: this.props.classes.icon_ava }}>
                  <AddIcon />
                </Avatar>
                <div className="info_nav">Create Staff Map</div>
                <span
                  style={{ position: "absolute", right: 40, color: "#9f9b9b" }}
                >
                  <RightArrowIcon />
                </span>
              </Link>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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

export default ProfileContent_Nav;
