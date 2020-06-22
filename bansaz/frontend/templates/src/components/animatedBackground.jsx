import React, { Component } from "react";
import "../style/animatedbackground.scss";
class Animatedbackground extends Component {
  constructor(props) {
    super(props);
    this.emptyArray = [];
    for (let i = 0; i <= 50; i++) {
      this.emptyArray.push(i);
    }
  }
  render() {
    return (
      <React.Fragment>
        {/* Generate 50 circles */}
        {this.emptyArray.map((index) => {
          return (
            <div className="circle-container" key={index}>
              <div className="circle"></div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Animatedbackground;
