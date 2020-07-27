import React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "@material-ui/core";

// Icons
import {
  Add as AddIcon,
  NavigateNext as RightArrowIcon,
} from "@material-ui/icons";

//Create DropDown Component
class Create_DropDown extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/*Create clan here */}

        <Link
          className="accountSettings desktop_nav_buttons_drop"
          to="/create-clan"
        >
          <Avatar classes={{ root: this.props.classes.icon_ava }}>
            <AddIcon />
          </Avatar>
          <div className="info_nav">Create Clan</div>

          <RightArrowIcon className="rightIcon" />
        </Link>

        {/* Create organization */}

        <Link className="help desktop_nav_buttons_drop" to="/create-staff-map">
          <Avatar classes={{ root: this.props.classes.icon_ava }}>
            <AddIcon />
          </Avatar>

          <div className="info_nav">Create Staff Map</div>

          <RightArrowIcon className="rightIcon" />
        </Link>
      </React.Fragment>
    );
  }
}

export default Create_DropDown;
