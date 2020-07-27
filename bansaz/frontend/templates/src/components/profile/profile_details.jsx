import React, { Component } from "react";

// Icons
import {
  Person as PersonIcon,
  Visibility as EyeIcon,
  EmojiObjects as ActivityIcon,
} from "@material-ui/icons";

import {
  BansazButton,
  BansazToolTip,
  BansazVerticalTab,
  BansazLinearTab,
  ButtonLetter,
} from "./../global/index";

// Renders structure for About and Bansaz
import AboutStructure from "./__structure_ABOUT";
import BansazStructure from "./__structure_BANSAZ";

class Profile_Details extends Component {
  render() {
    return (
      <>
        {/* Top most Bar */}

        <div className="upperControl_Profile_Detail_container">
          <div className="upperControl_Profile_Detail">
            <BansazButton
              icon={<PersonIcon />}
              content="Edit Profile"
              onClickHandler={this.viewProfile}
            />

            <BansazToolTip title="View as">
              <BansazButton
                icon={<EyeIcon />}
                onClickHandler={this.viewProfile}
              />
            </BansazToolTip>

            <BansazButton
              icon={<ActivityIcon />}
              onClickHandler={this.viewProfile}
              content="Activity Log"
            />
          </div>

          {/* About */}

          <div className="details_profile">
            <BansazLinearTab title="About" content={AboutStructure} />
          </div>
        </div>

        {/* Bansaz */}

        <div className="lower_profile_Others_container">
          <BansazVerticalTab content={BansazStructure} />
        </div>
      </>
    );
  }
}

export default Profile_Details;
