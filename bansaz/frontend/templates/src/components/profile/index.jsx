import React, { Component } from "react";
import Profile_Pic from "./profile_pic";
import Profile_Details from "./profile_details";
import "../../style/profile.css";
class ProfilePage extends Component {
  render() {
    return (
      <>
        {/* Profile Details */}
        <div className="profile_container_pic_detail">
          <div>
            <Profile_Pic />
            <div className="name_details_profile">Bimarsh Bhusal</div>
          </div>
          <Profile_Details />
        </div>
      </>
    );
  }
}

export default ProfilePage;
