import React, { Component } from "react";

import Profile_Pic from "./profile_pic";
import ProfleBansaz from "./profile_details";

// Styles
import "./styles/index.css";

class ProfilePage extends Component {
  render() {
    return (
      <>
        <div className="profile_container_pic_detail">
          <div>
            <Profile_Pic />

            <div className="name_details_profile">Bimarsh Bhusal</div>
          </div>

          {/* Profile Bansaz */}

          <ProfleBansaz />
        </div>
      </>
    );
  }
}

export default ProfilePage;
