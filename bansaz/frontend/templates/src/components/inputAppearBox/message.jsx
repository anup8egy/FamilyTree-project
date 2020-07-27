import React from "react"
import PropTypes from "prop-types"

class InputAppear_Message extends React.Component {
  render() {
    return (
      <>
        {this.props.open ? (
          <div
            //Either Success or Error Message
            className={
              this.props.error
                ? "message_profile_add_about_err"
                : "message_profile_add_about_correct"
            }
          >
            {this.props.message}
          </div>
        ) : (
          ""
        )}
      </>
    )
  }
}

InputAppear_Message.defaultProps = {
  error: false,
  open: true,
}

InputAppear_Message.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
  open: PropTypes.bool,
}

export default InputAppear_Message

/* Usage::
    <Message 
    message="HRLLO" 
    error={true}  
    open={true}
    />
*/
