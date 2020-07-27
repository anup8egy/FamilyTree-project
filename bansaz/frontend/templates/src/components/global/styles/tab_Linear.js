const style_sidewise_bansaz = () => ({
  root: {
    background: "#131313",
    borderRadius: 10,
  },

  selected: {
    background: "#1c1a1a",
  },

  wrapper: {
    flexDirection: "row",
    gap: "10px",
    justifyContent: "unset",
    textAlign: "left",
    color: "white",
    textTransform: "none",
  },

  scroller: {
    "& span": {
      background: "#15151500",
    },

    "& .MuiTabs-flexContainer": {
      gap: "10px",
    },
  },
});

export default style_sidewise_bansaz;
