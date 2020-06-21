import React, { Component } from "react";
export default class NavBar extends Component {
  render() {
    return (
      <section className="nav">
        <div className="logo"></div>
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
