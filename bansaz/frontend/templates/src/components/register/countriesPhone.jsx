import React, { Component } from "react";
import ReactCountryFlag from "react-country-flag";
import { TextField, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import Countries from "./countryList.json";
const useStyles = () => ({
  avatar: {
    height: 150,
    width: 150,
    background: "#dedada0f",
  },
  img: {
    width: "auto",
    height: "50%",
  },
  textField: {
    "& label": {
      color: "#bfb9b9ed",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline::before": {
      borderBottom: "1px solid rgba(130, 125, 125, 0.42)",
    },
    "& .MuiInput-underline::after": {
      borderBottom: "1px solid rgba(205, 198, 198, 0.64)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled)::before": {
      borderBottom: "1px solid rgba(197, 191, 191, 0.87)",
    },
    "& .MuiInputBase-root": {
      color: "rgba(211, 200, 200, 0.87)",
    },
  },
  customCheckBox: {
    color: "#afb3d3 !important",
  },
  Autocomplete: {
    maxWidth: 200,
  },
});
class CountryWithPhoneCode extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    this.setTelCode = this.props.setPhoneCode;
    this.setCountry = this.props.setCountry;
  }
  state = {
    countryCode: "",
  };
  handleCountryChange = (e, value) => {
    this.setCountry(
      value === null || typeof value === undefined
        ? this.geoLocation
        : value.label
    );
    this.setTelCode(
      value === null || typeof value === undefined
        ? this.geoPhoneCode
        : value.phone
    );
    this.setState({
      countryCode:
        value === null || typeof value === undefined
          ? this.geoLocation
          : value.code,
    });
  };
  render() {
    return (
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <GetFlags
            countryCode={
              this.state.countryCode === ""
                ? this.props.geoLocation
                : this.state.countryCode
            }
          />
        </Grid>
        <Grid item>
          <Autocomplete
            classes={{ root: this.classes.Autocomplete }}
            disabled={this.props.disabled}
            style={{ width: 300 }}
            options={Countries.list}
            autoHighlight
            autoSelect
            value={{ label: this.props.country }}       
            getOptionSelected={(option, value) => {
              return option.label === this.props.country;
            }}
            getOptionLabel={(option) => option.label}
            onChange={this.handleCountryChange}
            renderOption={(option) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <GetFlags countryCode={option.code} />
                </span>
                &nbsp;{" "}
                <span style={{ fontSize: "0.7em" }}>+{option.phone}</span>
                &nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "0.9em", textAlign: "left" }}>
                  {option.label}
                </span>
              </div>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                classes={{
                  root: this.classes.textField,
                }}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                }}
                error={!this.props.error}
                helperText={!this.props.error ? "Select a country" : ""}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(CountryWithPhoneCode);
function GetFlags(props) {
  const { countryCode } = props;
  return (
    <React.Fragment>
      {countryCode === undefined ? (
        ""
      ) : (
        <div>
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              width: "2em",
              height: "2em",
            }}
            title="US"
          />
        </div>
      )}
    </React.Fragment>
  );
}
