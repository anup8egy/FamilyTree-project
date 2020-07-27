import React from "react";
import { Box, Divider } from "@material-ui/core";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, orientation, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{ position: "relative" }}
    >
      {orientation === "vertical" ? (
        <Divider
          orientation="vertical"
          style={{
            backgroundColor: "rgba(166, 152, 152, 0.41)",
            marginLeft: "10px",
            position: "absolute",
          }}
        />
      ) : (
        ""
      )}

      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.defaultProps = {
  orientation: "horizontal",
};

TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default TabPanel;
