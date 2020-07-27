const Forgot_Styles = () => ({
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
    maxWidth: 240,
    minWidth: 240,
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
    "& p": {
      color: "rgba(189, 182, 182, 0.7)",
    },
  },
  customCheckBox: {
    color: "#afb3d3 !important",
  },
  button: {
    color: "#b8b8b8",
    fontSize: "0.8em",
    maxWidth: 280,
    minWidth: 280,
    textTransform: "none",
  },
  outlined: {
    border: "1px solid rgba(197, 180, 180, 0.62)",
    padding: "3px 20px",
  },
  toolTipper: {
    fontSize: "0.8em",
  },
  buttonDisabled: {
    color: "#a0a7a09e !important",
    border: "1px solid rgba(244, 240, 240, 0.23)",
  },
  outlined: {
    border: "1px solid rgba(197, 180, 180, 0.62)",
    padding: "3px 20px",
  },
});

export default Forgot_Styles;
