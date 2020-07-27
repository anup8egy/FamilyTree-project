import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import SampleProfilePic from "../../pics/sample_profile.jpg";

// Styles
import "./style.css";
import LoggedNavStyle from "./styles";

import MobileNavBar from "./__mobile";
import DesktopnavBar from "./__desktop";

class NavBar_Dash extends Component {
  state = {
    isMobileDevice: true,
  };

  componentDidMount() {
    //   To check whetehr mobile or another then display data based on that
    this.screenCheck();
  }

  screenCheck = () => {
    var isMobileWidth = window.matchMedia("(max-width: 550px)");
    if (isMobileWidth.matches) this.setState({ isMobileDevice: true });
    else this.setState({ isMobileDevice: false });
    isMobileWidth.addListener(this.screenCheck);
  };

  render() {
    return (
      <React.Fragment>
        {/* If mobile then show mobile nav or show desktop */}

        {this.state.isMobileDevice ? (
          <MobileNavBar {...this.props} profilePic={SampleProfilePic} />
        ) : (
          <DesktopnavBar {...this.props} profilePic={SampleProfilePic} />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(LoggedNavStyle)(NavBar_Dash);
