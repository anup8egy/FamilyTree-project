import React from "react";
import { ButtonLetter } from "./../../global/index";

// Icons
import { School as EducationIcon, Add as AddIcon } from "@material-ui/icons";

import InputAppear from "./../../inputAppearBox/index";

class AboutLayout extends React.Component {
  state = {
    isOrganizationAddOpened: false,
  };

  handleCloseAboutAdd = (value) => {
    this.setState({ isOrganizationAddOpened: value });
  };

  // When Input of About Page is Submitted
  handleSubmitOfAbout = (value) => {
    let return_object;
    fetch(
      "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=boolean&encode=base64"
    )
      .then((resp) => resp.json())
      .then(
        (resp) =>
          (return_object = { bool: true, message: resp.results[0].category })
      );
    return return_object;
  };

  render() {
    return (
      <>
        {/* If admin opens profile */}

        {this.props.admin
          ? this.props.content.as_Admin.map((data, index) => {
              return (
                <div key={index} className="user_about_items__">
                  {/* IF data available already */}

                  {data.icon}
                  {data.available ? (
                    <>{data.value}</>
                  ) : (
                    <ButtonLetter
                      content={`Add a new ${data.content}`}
                      icon={<AddIcon />}
                      clickHandler={this.handleCloseAboutAdd}
                    />
                  )}
                </div>
              );
            })
          : // If opened by Normal Out User

            this.props.content.as_Admin.map((data, index) => {
              return (
                <div key={index} className="user_about_items__">
                  {/* IF data available already */}

                  {data.icon}

                  {data.available
                    ? data.value
                    : `${data.content} not available`}
                </div>
              );
            })}

        <InputAppear
          open={this.state.isOrganizationAddOpened}
          handleClose={this.handleCloseAboutAdd}
          icon={<EducationIcon />}
          title="Something"
          subtitle="On label"
          lowLabel="More Info Below Box"
          onSubmit={this.handleSubmitOfAbout}
          placeholder="Enter username"
          type="password"
        />
      </>
    );
  }
}

export default AboutLayout;
