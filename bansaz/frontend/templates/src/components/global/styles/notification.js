const NotificationStyle = () => ({
  root: {
    "& .MuiPaper-root": {
      fontSize: "1.1em",
      padding: "12px",
      background: "#eeebeb",
      color: "black",
    },

    "& .MuiSnackbarContent-message": {
      display: "flex",
      gap: "10px",
    },
  },
});

export default NotificationStyle;
