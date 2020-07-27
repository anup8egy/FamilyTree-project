import React from "react"
import { Button, withStyles } from "@material-ui/core"
import PropTypes from "prop-types"

// Styling
import style_CBAR from "./styles/controlBar"

class InputAppear_ControlBar extends React.Component {
  render() {
    return (
      <div className="control_input_add_input_field_dialog__comp">
        <Button
          disabled={this.props.isDisabled_Loading}
          classes={{
            root: this.props.classes.control_button_cancel,
            disabled: this.props.classes.buttonDisabled_cancel,
          }}
          disableRipple
          onClick={() => this.props.onCancel(false)}
        >
          Cancel
        </Button>

        <Button
          disabled={this.props.isDisabled_Loading}
          classes={{
            root: this.props.classes.control_button_submit,
            disabled: this.props.classes.buttonDisabled_submit,
          }}
          disableRipple
          onClick={this.props.onSubmit}
          type="submit"
        >
          Submit
        </Button>
      </div>
    )
  }
}

InputAppear_ControlBar.defaultProps = {
  isDisabled_Loading: false,
}

InputAppear_ControlBar.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDisabled_Loading: PropTypes.bool,
}

export default withStyles(style_CBAR)(InputAppear_ControlBar)
