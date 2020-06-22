import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../style/index.css";
import { Link } from "react-router-dom";
import AnimatedBackground from "./animatedBackground";
export default class LandingPage extends Component {
  render() {
    return (
      <section className="intro">
        <AnimatedBackground />
        <section className="introContainer">
          <div className="blobSection">
            <div className="blobber">
              <div className="header">
                <h1>Kul</h1>
                <div className="subheader">
                  <h2>The Clan App</h2>
                </div>
              </div>
              <div className="controlButtons">
                <Button
                  disableRipple
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Register
                </Button>
                <Link to="/login">
                  <Button
                    disableRipple
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="emptySection"></div>
        </section>
      </section>
    );
  }
}
