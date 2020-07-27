const theme_provider = () => ({
  paper: {
    "& *": {
      fontFamily: "Jost",
    },
    width: "100%",
    background: "#0f0f0f",
    minHeight: "200px",
    padding: "10px 30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    position: "relative",
  },
  dark: {
    color: "green",
    background: "blue",
  },
})

export default theme_provider
