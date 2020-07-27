import { withStyles, LinearProgress } from "@material-ui/core";

const LinearProgBar = withStyles((theme) => ({
  root: {
    height: 3,
    maxHeight: 3,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  colorPrimary: {
    backgroundColor: "#393939",
  },
  bar: {
    backgroundColor: "#b9c2cb",
  },
}))(LinearProgress);

export default LinearProgBar;
