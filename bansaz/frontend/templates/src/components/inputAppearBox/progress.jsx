import React from "react"
import { withStyles, LinearProgress } from "@material-ui/core"
import PropTypes from "prop-types"

// Progress Styling
import progress_style from "./styles/progress"

class Progress extends React.Component {
  render() {
    return (
      <>
        {this.props.open ? (
          <LinearProgress
            classes={{
              root: this.props.classes.progress,
              colorPrimary: this.props.classes.primaryColor,
              barColorPrimary: this.props.classes.barColorPrimary,
            }}
          />
        ) : (
          ""
        )}
      </>
    )
  }
}

Progress.defaultProps = {
  open: true,
}

Progress.propTypes = {
  open: PropTypes.bool,
}
export default withStyles(progress_style)(Progress)

/* Usage : 
    <LinearProgress 
      open={true}
    />
*/
