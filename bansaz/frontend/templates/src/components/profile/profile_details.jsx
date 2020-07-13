import React, { Component } from "react";
import {
  ButtonBansaz,
  ToolTipBansaz,
  SideWiseBansaz,
  DownWiseBansaz,
} from "../univ_component/bansaz_items";
import {
  Person as PersonIcon,
  Visibility as EyeIcon,
  EmojiObjects as ActivityIcon,
  ViewStream as OverviewIcon,
  School as EducationIcon,
  ImportContacts as ContactIcon,
  Grain as FamilyIcon,
  Flag,
} from "@material-ui/icons";
class Profile_Details extends Component {
  constructor() {
    super();
    // About details Object
    this.__content_about = [
      { Overview: <OverView />, icon: <OverviewIcon /> },
      {
        Education: <Education />,
        icon: <EducationIcon />,
      },
      {
        "Contacts and Basic Info": <ButtonBansaz content="hello ho" />,
        icon: <ContactIcon />,
      },
      {
        "Family and Relationship": <ButtonBansaz content="hello ho" />,
        icon: <FamilyIcon />,
      },
    ];
    // Details Object
    this.__content_bansaz = [
      {
        "Recent Bansaz": <ButtonBansaz content="First Item" />,
        icon: <OverviewIcon />,
      },
      {
        "Recent Staff Maps": <ButtonBansaz content="Second Item" />,
        icon: <OverviewIcon />,
      },
      {
        "All Overview": <ButtonBansaz content="Third Item" />,
        icon: <OverviewIcon />,
      },
    ];
  }
  state = {
    message: "",
  };
  viewProfile = (value) => {
    this.setState({ message: "Hayy Sexy WASSUo" });
  };
  render() {
    return (
      <>
        <div className="upperControl_Profile_Detail_container">
          <div className="upperControl_Profile_Detail">
            <ButtonBansaz
              icon={<PersonIcon />}
              content="Edit Profile"
              onClickHandler={this.viewProfile}
            />
            <ToolTipBansaz title="View as">
              <ButtonBansaz
                icon={<EyeIcon />}
                onClickHandler={this.viewProfile}
              />
            </ToolTipBansaz>
            <ButtonBansaz
              icon={<ActivityIcon />}
              onClickHandler={this.viewProfile}
              content="Activity Log"
            />
          </div>
          <div className="details_profile">
            <SideWiseBansaz title="About" content={this.__content_about} />
          </div>
        </div>
        <div className="lower_profile_Others_container">
          <DownWiseBansaz content={this.__content_bansaz} />
        </div>
      </>
    );
  }
}
// About Components
class AboutDefault extends Component {
  render() {
    return (
      <>
        {/* If admin opens profile */}
        {this.props.admin
          ? this.props.content.as_Admin.map((data, index) => {
              return (
                <div key={index} className="user_about_items__">
                  {/* IF not set already */}
                  {data.available
                    ? data.value
                    : `${data.content} not available`}
                </div>
              );
            })
          : ""}
      </>
    );
  }
}
function OverView() {
  return (
    <AboutDefault
      content={{
        as_Admin: [
          {
            content: "Workplace",
            available: true,
            icon: "someth",
            value: "Kathmandu Was Poplar",
          },
          {
            content: "School",
            available: true,
            value: "Shree Shanti Namuna S.S",
          },
          {
            content: "College",
            available: true,
            value: "Shree Shanti Namuna S.S",
          },
          {
            content: "City",
            available: true,
            value: "Butwal",
          },
          {
            content: "Relationship Status",
            available: true,
            value: "Single",
          },
        ],
        as_user: [
          {
            content: "Workplace",
            available: true,
            value: "Kathmadnu was Poplar",
          },
        ],
      }}
      admin={true}
    />
  );
}
function Education() {
  return (
    <AboutDefault
      content={{
        as_Admin: [
          {
            content: "School",
            available: true,
            value: "Shree Shanti Namuna S.S",
          },
          {
            content: "College",
            available: true,
            value: "Shree Shanti Namuna S.S",
          },
        ],
        as_user: [
          {
            content: "School",
            available: true,
            value: "Shree Shanti Namuna S.S",
          },
          {
            content: "College",
            available: true,
            value: "Shree Shanti Namuna S.S",
          },
        ],
      }}
      admin={true}
    />
  );
}
export default Profile_Details;
