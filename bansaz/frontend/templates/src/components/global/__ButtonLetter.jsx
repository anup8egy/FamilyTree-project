import React from "react";
import { Button, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// Styles
import LetterButtonStyle from "./styles/buttonLetter";

class BansazButtonLetter extends React.Component {
  render() {
    return (
      <Button
        onClick={() => this.props.clickHandler(true)}
        disableRipple
        classes={{ root: this.props.classes.root }}
      >
        {this.props.icon}
        {this.props.content}
      </Button>
    );
  }
}

BansazButtonLetter.propTypes = {
  clickHandler: PropTypes.func,
  icon: PropTypes.element,
  content: PropTypes.node,
};

export default withStyles(LetterButtonStyle)(BansazButtonLetter);

// usage:: <ButtonLetter content={`Add a new `} icon={<AddIcon /> clickHandler={this.handleAddAbout}/>
