import React from "react"
import PropTypes from "prop-types"
class InputAppear_Title extends React.Component {
  render() {
    return (
      <div className="add_input_field_dialog__comp">{this.props.title}</div>
    )
  }
}

InputAppear_Title.propTypes = {
  title: PropTypes.string,
}

export default InputAppear_Title

/* Usage::
    <Title 
    title="TITLE" 
    />
 */