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
    this.setName = this.props.setName;
    this.setEmail = this.props.setEmail;
    this.setCountry = this.props.setCountry;
    this.setPhone = this.props.setPhone;
    this.setPassword = this.props.setPassword;
    this.setConfirmPassword = this.props.setConfirmPassword;
    this.togglePWVisible = this.props.togglePWVisible;
    this.setPhoneCode = this.props.setPhoneCode;
    this.firstNext = this.props.firstNextClick;
  }
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
            label="Full Name"
            placeholder="Enter Full Name"
            value={this.props.name}
            onChange={(e) => this.setName(e.target.value)}
            helperText={this.props.isNameCorrect ? "" : "Invalid Name"}
            error={!this.props.isNameCorrect}
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
            onChange={(e) => this.setEmail(e.target.value)}
            helperText={this.props.isEmailCorrect ? "" : "Invalid Email"}
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
