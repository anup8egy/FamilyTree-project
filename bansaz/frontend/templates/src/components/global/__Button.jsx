import React from "react";
import { withStyles, Button } from "@material-ui/core";
import propTypes from "prop-types";

// Styles
import ButtonStyle from "./styles/buttons";

class Button_Bansaz_Black extends React.Component {
  render() {
    return (
      <Button
        onClick={this.props.onClickHandler}
        classes={{ root: this.props.classes.root }}
      >
        {this.props.icon}

        {this.props.content}
      </Button>
    );
  }
}

Button_Bansaz_Black.propTypes = {
  onClick: propTypes.func,
};

export default withStyles(ButtonStyle)(Button_Bansaz_Black);
