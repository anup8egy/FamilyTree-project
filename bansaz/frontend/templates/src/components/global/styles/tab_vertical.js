import style_sidewise_bansaz from "./tab_Linear";

const style_downWiseTab = () => ({
  root: {
    background: "#111010",
    borderRadius: "10px",
  },

  wrapper: {
    flexDirection: "row",
    textTransform: "none",
    textIndent: "5px",
  },

  scroller: {
    "& > span": {
      background: "#1c1a1a00",
      display: "none",
    },
  },

  flexContainer: {
    gap: "10px",
  },

  selected: {
    background: "#1c1a1a",
  },
});

export default style_downWiseTab;
