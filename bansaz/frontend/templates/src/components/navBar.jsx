import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import "../style/navBar.css";
export default class NavBar extends Component {
  render() {
    return (
      <section className="nav">
        <div className="logo">
          <Avatar>Logo</Avatar>
        </div>
        <div className="navItems">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Pout</li>
            <li>Route</li>
          </ul>
        </div>
      </section>
    );
  }
}
