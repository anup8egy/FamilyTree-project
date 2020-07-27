import React from "react";
import AboutLayout from "./about_LAYOUT";

// Icons
import {
  School as EducationIcon,
  Work as WorkIcon,
  Room as PlaceIcon,
  Group as RelationshipIcon,
} from "@material-ui/icons";

function OverView() {
  return (
    <AboutLayout
      content={{
        as_Admin: [
          {
            content: "Workplace",
            available: true,
            icon: <WorkIcon />,
            value: "Kathmandu Was Poplar",
          },
          {
            content: "School",
            available: false,
            icon: <EducationIcon />,
            value: "Shree Shanti Namuna S.S",
          },
          {
            content: "College",
            available: true,
            icon: <EducationIcon />,
            value: "Shree Shanti Namuna S.S",
          },
          {
            content: "City",
            available: true,
            icon: <PlaceIcon />,
            value: "Butwal",
          },
          {
            content: "Relationship Status",
            available: true,
            icon: <RelationshipIcon />,
            value: "Single",
          },
        ],
      }}
      admin={true}
      // admin set to true then displayed as Admin else as Viewer
    />
  );
}

export default OverView;
