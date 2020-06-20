import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import "../styles/navBar.css";
export default class Navbar extends Component {
  render() {
    return (
      <section className="navBar">
        <Avatar>Logo</Avatar>
        <div className="items">
          <ul>
            <li>Aout</li>
            <li>Home</li>
            <li>Whereer</li>
          </ul>
        </div>
      </section>
    );
  }
}
