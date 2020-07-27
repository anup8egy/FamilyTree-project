const style_CBAR = () => ({
  control_button_submit: {
    background: "#0c483aed",
    fontSize: "0.8em",
    color: "white",
    "&:hover": {
      background: "#052d23ed",
    },
  },
  control_button_cancel: {
    color: "#1cae8c",
    fontSize: "0.8em",
  },
  buttonDisabled_cancel: {
    cursor: "not-allowed !important",
    color: "#116f59e0 !important",
    pointerEvents: "auto !important",
  },
  buttonDisabled_submit: {
    cursor: "not-allowed !important",
    color: "#ccc9c9 !important",
    pointerEvents: "auto !important",
    "&:hover": {
      background: "#052d23ed !important",
    },
  },
})

export default style_CBAR
