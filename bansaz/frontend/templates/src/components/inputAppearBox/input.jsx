import React from "react"
import { withStyles, TextField, InputAdornment } from "@material-ui/core"
import PropTypes from "prop-types"

// Styling
import input_styling from "./styles/input"

class InputAppear_Input extends React.Component {
  state = {
    icon: "",
  }

  //   To get Icon whether managed string or Component
  getIcon = (icon_prop, iconType_String, capitalize) => {
    let icon

    // IF icon is string strip All extras
    if (typeof icon_prop === "string") {
      switch (iconType_String) {
        case "single":
          icon = icon_prop.slice(0, 1)
          break
        case "double":
          icon = icon_prop.slice(0, 2)
          break
        case "all":
          icon = icon_prop
          break
        default:
          // do single on default
          icon = icon_prop.slice(0, 1)
          break
      }

      //   Capitalize if Necessary
      if (capitalize) icon = icon.toUpperCase()
    } else {
      //If NOT string, then return component
      icon = icon_prop
    }

    return icon
  }

  //
  componentDidMount() {
    // Get and set the icon
    this.setState({
      icon: this.getIcon(
        this.props.icon,
        this.props.iconStringType,
        this.props.capitalize
      ),
    })
  }

  //  Enter key is pressed
  submit = () => {
    this.props.onSubmit()
  }
  render() {
    return (
      <TextField
        variant="outlined"
        label={this.props.label}
        helperText={this.props.helperText}
        classes={{ root: this.props.classes.root }}
        placeholder={this.props.placeholder}
        type={this.props.type}
        InputProps={{
          startAdornment:
            //   Load icon if provided any
            this.props.icon ? (
              <InputAdornment position="start">
                <span style={{ color: "#bfb7b7", fontSize: "1.8rem" }}>
                  {this.state.icon}
                </span>
              </InputAdornment>
            ) : (
              ""
            ),
        }}
        error={this.props.error}
        onChange={e => this.props.onInput(e.target.value)}
        onKeyUp={e => (e.keyCode === 13 ? this.submit() : null)}
      />
    )
  }
}

InputAppear_Input.defaultProps = {
  capitalize: true,
  iconStringType: "single",
}

InputAppear_Input.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  capitalize: PropTypes.bool,
  iconStringType: PropTypes.oneOf(["single", "double", "all"]),
  onInput: PropTypes.func.isRequired,
}

export default withStyles(input_styling)(InputAppear_Input)

/*  Usage::
     <Input
        label="Name"
        helperText="Enter your full name"
        placeholder="Enter name"
        error={true}
        onSubmit={data => console.log(data)}
        type="name"
        icon={"bimar"}
        capitalize={false}
        iconStringType="double"
        onInput={this.onInput}
    />
*/
