import React from "react"
import { Dialog, withStyles } from "@material-ui/core"
import PropTypes from "prop-types"

// Components
import Progressbar from "./progress"
import Title from "./title"
import Input from "./input"
import Message from "./message"
import ControlBar from "./control_bar"

// CSS Imports
import "./../../fonts/fonts.css"
import "./styles/inputBox.css"

import IndexStyling from "./styles"

class InputBoxAppear extends React.Component {
  constructor(props) {
    super(props)
    this.classes = this.props.classes
  }

  state = {
    userInput: "",
    isFetching__load: this.props.isLoading,
  }

  // To set User data to state
  setInput = value => this.setState({ userInput: value })

  // To Toggle Dialog Open or Close
  toggle = value => this.props.toggleOpen(Boolean(value))

  // To submit user data
  // This function should return user Input
  submit = () => {
    this.setState({ isFetching__load: true })
    this.props.onSubmit(this.state.userInput)
  }

  render() {
    return (
      <>
        <Dialog
          open={this.props.open}
          classes={{ paper: this.props.classes.paper }}
          onClose={() =>
            this.state.isFetching__load ? null : this.toggle(false)
          }
        >
          {/* Use progress if only PROP is set True */}
          {this.props.progressOpen ? (
            <Progressbar open={this.state.isFetching__load} />
          ) : (
            ""
          )}

          <Title title={this.props.title} />

          <Input
            placeholder={this.props.placeholder}
            type={this.props.type}
            label={this.props.label}
            helperText={this.props.helperText}
            icon={this.props.icon}
            iconStringType={this.props.iconStringType}
            capitalize={this.props.capitalize}
            error={this.props.error}
            onSubmit={this.submit}
            onInput={this.setInput}
          />

          <Message
            message={this.props.message}
            open={this.props.messageOpen}
            error={this.props.messageError}
          />

          <ControlBar
            onCancel={this.toggle}
            onSubmit={this.submit}
            isDisabled_Loading={this.state.isFetching__load}
          />
        </Dialog>
      </>
    )
  }
}

InputBoxAppear.defaultProps = {
  open: true,
  isLoading: false,
}

InputBoxAppear.propTypes = {
  // All
  open: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,

  // Title
  title: PropTypes.string,

  // Input
  placeholder: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  capitalize: PropTypes.bool,
  iconStringType: PropTypes.oneOf(["single", "double", "all"]),
  error: PropTypes.bool,
  type: PropTypes.string,

  // Message
  message: PropTypes.string,
  messageOpen: PropTypes.bool,
  messageError: PropTypes.bool,

  // Progress
  progressOpen: PropTypes.bool,
}

export default withStyles(IndexStyling)(InputBoxAppear)

/*

        <InputBox_Appear
          open={this.state.open}
          toggleOpen={this.toggleOpen}
          onSubmit={this.submit}
          title="WHATS_UP_MF"
          label="UserName"
          helperText="At least 6 letter"
          placeholder="Enter username"
          progressOpen={true}
          icon="bimarsh"
          capitalize={true}
          iconStringType="double"
          error={false}
          type="email"
          message="Sorry!! Couldnt process at here"
          messageOpen={true}
          messageError={false}
          isLoading={true}
        />
Notes::onSubmit function should take user Input as argument        
*/
