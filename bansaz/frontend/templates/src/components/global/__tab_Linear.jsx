import React from "react";
import { Tabs, Tab, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import TabPanel from "./__tabPanel";

// Styles
import TabStyle from "./styles/tab_Linear";

class LinearTab extends React.Component {
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
          orientation="vertical"
          value={this.state.value}
          classes={{ scroller: this.props.classes.scroller }}
          onChange={this.handleChange}
        >
          {/* Tab Names are Here */}

          {this.props.content.map((data, index) => {
            return (
              <Tab
                label={Object.getOwnPropertyNames(data)[0]}
                icon={data.icon}
                classes={{
                  wrapper: this.props.classes.wrapper,
                  root: this.props.classes.root,
                  selected: this.props.classes.selected,
                }}
                disableRipple
                key={index}
              />
            );
          })}
        </Tabs>

        {/* Tab Panels should be here */}

        {this.props.content.map((data, index) => {
          return (
            <TabPanel
              value={this.state.value}
              index={index}
              key={index}
              orientation="vertical"
            >
              {Object.values(data)[0]}
            </TabPanel>
          );
        })}
      </>
    );
  }
}

LinearTab.propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(TabStyle)(LinearTab);

// Usage of SideWise: <SideWiseBansaz title="About" content={this.__content_about} />

// content should be an array of objects like this::
//  [{ Sidetitle: <ComponenttoRenderWhenThistabActive />, icon: <IconSideTab /> },{Nexttitle : <ComponentForThisActive />,icon: <Icon />,}];
// *****
