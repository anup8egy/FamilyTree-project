import React from "react";
import { Tabs, Tab, withStyles } from "@material-ui/core";

import TabPanel from "./__tabPanel";

// Styles
import VerticalTabStyle from "./styles/tab_vertical";

class VerticalTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (e, value) => {
    this.setState({ value: value });
  };

  render() {
    return (
      <>
        <div className="bansaz_items_profile_title_ab">{this.props.title}</div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          classes={{
            scroller: this.props.classes.scroller,
            flexContainer: this.props.classes.flexContainer,
          }}
        >
          {this.props.content.map((data, index) => {
            return (
              <Tab
                label={Object.getOwnPropertyNames(data)[0]}
                key={index}
                icon={Object.values(data)[1]}
                classes={{
                  root: this.props.classes.root,
                  wrapper: this.props.classes.wrapper,
                  selected: this.props.classes.selected,
                }}
                disableRipple
              />
            );
          })}
        </Tabs>

        {/* Tab Panels */}

        {this.props.content.map((data, index) => {
          return (
            <TabPanel value={this.state.value} index={index} key={index}>
              {/* Tab Descript */}
              {Object.values(data)[0]}
            </TabPanel>
          );
        })}
      </>
    );
  }
}

export default withStyles(VerticalTabStyle)(VerticalTab);
