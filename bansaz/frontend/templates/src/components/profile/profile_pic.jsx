import React, { Component } from "react";
import { Avatar, Badge, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DefaultPersonImage from "../../pics/person.png";
// Components
import PictureViewer from "../univ_component/picture_viewer";
// Skeletals
import { ProfilePicLoading } from "../univ_component/skeletal";
import { Camera, Close, Publish, Fullscreen } from "@material-ui/icons";

// Sample Pic
import SampleProfilePic from "../../pics/sample_profile.jpg";
// styles
const useStyles = () => ({
  profile_root: {
    width: 200,
    height: 200,
    background: "#131313de",
  },
  profile_img: {
    height: "auto",
    width: "auto",
  },
  profile_badge: {
    backgroundColor: "#403d3e",
    borderRadius: 100,
    height: 50,
  },
  profile_view_inner_butt: {
    background: "#393535c7",
    transition: "0.3s all",
    "&::before": {
      content: "''",
      position: "absolute",
      color: "#bdbdbded",
      fontSize: "0.6em",
      left: 0,
      textIndent: 5,
    },
    "&:hover": {
      borderRadius: 10,
      width: 60,
      padding: "0px 5px",
      "& button": {
        left: 20,
      },
      "&::before": {
        content: "'View'",
      },
    },
  },
  profile_add_inner_butt: {
    background: "#393535c7",
    transition: "0.3s all",
    "&::before": {
      content: "''",
      position: "absolute",
      color: "#bdbdbded",
      fontSize: "0.6em",
      left: 0,
      textIndent: 5,
    },
    "&:hover": {
      borderRadius: 10,
      width: 60,
      padding: "0px 5px",
      "& button": {
        left: 20,
      },
      "&::before": {
        content: "'Upload'",
      },
    },
  },
  icons_styling: {
    color: "#8a8787",
  },
});

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
          <ProfilePicLoading />
        ) : (
          <Badge
            classes={{ badge: this.props.classes.profile_badge }}
            overlap="circle"
            badgeContent={
              <AddView_Profile_Pic
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
//Add or view button Its a badge content
class AddView_Profile_Pic extends Component {
  state = {
    isOpenerOpened: false,
    isPictureOpened: false,
  };
  // Combine Styling
  render() {
    return (
      <>
        <IconButton
          onClick={() =>
            this.setState((states) => ({
              isOpenerOpened: !states.isOpenerOpened,
            }))
          }
        >
          {this.state.isOpenerOpened ? (
            <Close className={this.props.style.icon} />
          ) : (
            <Camera className={this.props.style.icon} />
          )}
        </IconButton>
        {/* If cliked then open this */}
        {this.state.isOpenerOpened ? (
          <div className="profile_pic_view_change_butt">
            {/* Upload Picture */}
            <Avatar
              classes={{
                root: this.props.style.add,
              }}
            >
              <IconButton>
                <Publish className={this.props.style.icon} />
              </IconButton>
            </Avatar>
            {/* View Picture */}
            <Avatar
              classes={{
                root: this.props.style.view,
              }}
            >
              {/* Full screen button */}
              <IconButton onClick={() => this.props.togglePic(true)}>
                <Fullscreen className={this.props.style.icon} />
              </IconButton>
            </Avatar>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withStyles(useStyles)(Profile_Pic);
