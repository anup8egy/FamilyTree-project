import React, { Component } from "react";
import { TextField, Button, InputAdornment, Avatar } from "@material-ui/core";
import {
  Person,
  AlternateEmail,
  Visibility,
  Call,
  VisibilityOff,
  Https,
  ConfirmationNumber,
  Report,
} from "@material-ui/icons";
import PhoneCode from "./countriesPhone";
import { Link } from "react-router-dom";
import SettingsLogo from "../../pics/add.png";
import CountriesList from "./countryList.json";
const getPhoneCodeFromCountryCode = (countryCode) => {
  let findCountryCode = (value) => value.code === countryCode;
  let reqObject = CountriesList.list.find(findCountryCode);
  if (reqObject === undefined || typeof reqObject === undefined) return "977";
  return reqObject.phone;
};
class RegisterFirstStep extends Component {
  constructor(props) {
    super(props);
    this.setFirstName = this.props.setFirstName;
    this.setLastName = this.props.setLastName;
    this.setEmail = this.props.setEmail;
    this.setCountry = this.props.setCountry;
    this.setPhone = this.props.setPhone;
    this.setPassword = this.props.setPassword;
    this.setConfirmPassword = this.props.setConfirmPassword;
    this.togglePWVisible = this.props.togglePWVisible;
    this.setPhoneCode = this.props.setPhoneCode;
    this.firstNext = this.props.firstNextClick;
    this.setUsername = this.props.setUsername;
  }
  handleOnEnter = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) this.firstNext();
  };
  render() {
    return (
      <div className="swipeItem">
        {/* User ID */}
        <div className="Avatar">
          <Avatar
            classes={{
              root: this.props.classlist.avatar,
              img: this.props.classlist.img,
            }}
            alt="USER"
            src={SettingsLogo}
          />
        </div>
        {/* Full Name Here */}
        <div className="uId">
          <TextField
            disabled={this.props.isFirstStepAllRight}
            label="First Name"
            placeholder="Enter First Name"
            value={this.props.firstname}
            onKeyUp={this.handleOnEnter}
            onChange={(e) => this.setFirstName(e.target.value)}
            helperText={this.props.isFirstNameCorrect ? "" : "Invalid Name"}
            error={!this.props.isFirstNameCorrect}
            classes={{
              root: this.props.classlist.textField,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* Last Name */}
        <div className="uId">
          <TextField
            disabled={this.props.isFirstStepAllRight}
            label="last Name"
            placeholder="Enter Last Name"
            value={this.props.lastname}
            onKeyUp={this.handleOnEnter}
            onChange={(e) => this.setLastName(e.target.value)}
            helperText={this.props.isLastNameCorrect ? "" : "Invalid Name"}
            error={!this.props.isLastNameCorrect}
            classes={{
              root: this.props.classlist.textField,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* Username */}
        <div className="uId">
          <TextField
            disabled={this.props.isFirstStepAllRight}
            label="Username"
            placeholder="Enter Username"
            value={this.props.username}
            onKeyUp={this.handleOnEnter}
            onChange={(e) => this.setUsername(e.target.value)}
            helperText={
              this.props.isUsernameCorrect
                ? "At least six character"
                : "Invalid Name or Already taken"
            }
            error={!this.props.isUsernameCorrect}
            classes={{
              root: this.props.classlist.textField,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* Email Address Here */}
        <div className="uId">
          <TextField
            label="Email"
            disabled={this.props.isFirstStepAllRight}
            placeholder="Enter email address"
            value={this.props.emailAddress}
            onKeyUp={this.handleOnEnter}
            onChange={(e) => this.setEmail(e.target.value)}
            helperText={
              this.props.isEmailCorrect ? "" : "Invalid Email or already used"
            }
            error={!this.props.isEmailCorrect}
            classes={{
              root: this.props.classlist.textField,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* Country Select */}
        <div className="uId">
          <PhoneCode
            setPhoneCode={this.setPhoneCode}
            setCountry={this.setCountry}
            error={this.props.isCountryCorrect}
            geoLocation={this.props.geoLocation}
            disabled={this.props.isFirstStepAllRight}
            country={this.props.country}
          />
        </div>
        {/* PhoneNumber */}
        <div className="uId">
          <TextField
            label="Phone Number"
            disabled={this.props.isFirstStepAllRight}
            placeholder="Enter your phone number"
            value={this.props.phone}
            onKeyUp={this.handleOnEnter}
            onChange={(e) => this.setPhone(e.target.value)}
            helperText={this.props.isPhoneCorrect ? "" : "Invalid Phone Number"}
            error={!this.props.isPhoneCorrect}
            classes={{
              root: this.props.classlist.textField,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Call />
                  &nbsp;&nbsp;+
                  {this.props.countryPhoneCode === ""
                    ? getPhoneCodeFromCountryCode(this.props.geoLocation)
                    : this.props.countryPhoneCode}
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* Password enter */}
        <div className="uId">
          <TextField
            disabled={this.props.isFirstStepAllRight}
            label="Password"
            placeholder="Enter password"
            value={this.props.password}
            onKeyUp={this.handleOnEnter}
            onChange={(e) => this.setPassword(e.target.value)}
            helperText={
              this.props.isPasswordCorrect
                ? "Minimum 8 characters required"
                : "Invalid Password"
            }
            error={!this.props.isPasswordCorrect}
            classes={{
              root: this.props.classlist.textField,
            }}
            InputProps={{
              type: this.props.isPasswordShown ? "text" : "password",
              startAdornment: (
                <InputAdornment position="start">
                  <Https />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  {this.props.isPasswordShown ? (
                    <Visibility
                      onClick={() => this.togglePWVisible()}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={() => this.togglePWVisible()}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* Confirm Passowrd */}
        <div className="uId">
          <TextField
            label="Confirm Password"
            disabled={this.props.isFirstStepAllRight}
            placeholder="Re-enter password"
            value={this.props.confirmPassword}
            onKeyUp={this.handleOnEnter}
            onChange={(e) => this.setConfirmPassword(e.target.value)}
            helperText={
              this.props.isConfirmPasswordCorrect ? "" : "Passwords don't match"
            }
            error={!this.props.isConfirmPasswordCorrect}
            classes={{
              root: this.props.classlist.textField,
            }}
            InputProps={{
              type: this.props.isPasswordShown ? "text" : "password",
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumber />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {this.props.showError ? (
          <div className="err">
            <Report />
            Sorry! Couldn't process this request
          </div>
        ) : (
          ""
        )}
        <div className="controlBar">
          <Button
            disabled={this.props.isFirstStepAllRight}
            variant="contained"
            color="primary"
            onClick={() => this.firstNext()}
          >
            Next
          </Button>
        </div>
        <div className="accountOptions">
          <Link to="/login">Login instead</Link>
        </div>
      </div>
    );
  }
}
export default RegisterFirstStep;
