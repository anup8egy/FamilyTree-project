import React from "react";
import { IconButton, Avatar } from "@material-ui/core";

// ICONS
import { Camera, Close, Publish, Fullscreen } from "@material-ui/icons";

class ProfilePIC_BADGE extends React.Component {
  state = {
    isOpenerOpened: false,
    isPictureOpened: false,
  };

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

export default ProfilePIC_BADGE;
