import React, { Component } from "react";
import { Avatar, Badge, withStyles } from "@material-ui/core";

// Pics
import DefaultPersonImage from "../../pics/person.png";

// Styles
import ProfilePicStyle from "./styles/profilePic";

import PictureViewer from "./../pictureViewer/index";
import ProfilePicBadge from "./__BADGE_profilepic";

// Skeletals
// import { ProfilePicLoading } from "../univ_component/skeletal";

// Sample Pic
import SampleProfilePic from "../../pics/sample_profile.jpg";
// styles

class Profile_Pic extends Component {
  state = { isLoading: true, isPictureOpened: false };

  // To turn on or off the picture
  handlePictureToggle = (bool) => {
    this.setState({ isPictureOpened: Boolean(bool) });
  };

  componentDidMount() {
    // Hide skeletals
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div>HEE </div>
        ) : (
          <Badge
            classes={{ badge: this.props.classes.profile_badge }}
            overlap="circle"
            badgeContent={
              <ProfilePicBadge
                style={{
                  view: this.props.classes.profile_view_inner_butt,
                  add: this.props.classes.profile_add_inner_butt,
                  icon: this.props.classes.icons_styling,
                }}
                togglePic={this.handlePictureToggle}
              />
            }
          >
            <Avatar
              classes={{
                root: this.props.classes.profile_root,
                img: this.props.classes.profile_img,
              }}
              src={DefaultPersonImage}
              alt="Profile"
            />
          </Badge>
        )}

        {/* View Full Profile Picture here */}

        <PictureViewer
          src={SampleProfilePic}
          open={this.state.isPictureOpened}
          onClose={this.handlePictureToggle}
        />
      </>
    );
  }
}

export default withStyles(ProfilePicStyle)(Profile_Pic);
