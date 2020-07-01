import React, { Component } from "react";
import Error1 from "../pics/err.png";
import Error2 from "../pics/error.png";
import Error3 from "../pics/erro.png";
import Error4 from "../pics/epr.png";
import "../style/error.css";
import Animated from "./animatedBackground";
import { Helmet } from "react-helmet";
class Error extends Component {
  generateRandomPhoto = () => {
    let elems = [Error1, Error2, Error3, Error4];
    let ran_num = Math.floor(Math.random() * elems.length);
    return elems[ran_num];
  };
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Page not Found | Kul</title>
        </Helmet>
        <div className="error_body">
          <nav>Kul,The Clan App</nav>
          <div
            style={{
              position: "absolute",
              overflow: "hidden",
              height: "100%",
              width: "100%",
              top: 0,
              left: 0,
            }}
          >
            <Animated />
          </div>
          <div className="errContent">
            <div className="avatarContainer">
              <div className="avatar">
                <img src={this.generateRandomPhoto()} alt="Error" />
              </div>
            </div>
            <div className="text">
              <span className="errCode">404</span>
              <span className="er">Error</span>
            </div>
            <br />
            <span className="error_descript">Page not found</span>
            <a className="butt_err" href="/">
              Go to Home
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Error;
