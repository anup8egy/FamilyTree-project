import React from "react";
import { withStyles, Tooltip } from "@material-ui/core";
import PropTypes from "prop-types";

// Styles
import ToolTipStyle from "./styles/toolTip";

class ToolTip_Bansaz extends React.Component {
  render() {
    return (
      <Tooltip
        title={this.props.title}
        classes={{ tooltip: this.props.classes.root }}
      >
        <div style={{ maxWidth: "max-content" }}>{this.props.children}</div>
      </Tooltip>
    );
  }
}

ToolTip_Bansaz.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(ToolTipStyle)(ToolTip_Bansaz);

// Usage ::<ToolTipBansaz title="Hello">...all stuffs </ToolTipBansaz>
