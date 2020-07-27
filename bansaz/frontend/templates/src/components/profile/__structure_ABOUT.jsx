import React from "react"
import { Overview, Education, Family, Contacts } from "./__PROFILE_about/index";

// Icons
import {
  ViewStream as OverviewIcon,
  School as EducationIcon,
  ImportContacts as ContactIcon,
  Grain as FamilyIcon,
} from "@material-ui/icons";

// About Tab is Rendered based on this Array

const About_Render = [
  { Overview: <Overview />, icon: <OverviewIcon /> },

  {
    Education: <Education />,
    icon: <EducationIcon />,
  },

  {
    "Contacts and Basic Info": <Contacts />,
    icon: <ContactIcon />,
  },

  {
    "Family and Relationship": <Family />,
    icon: <FamilyIcon />,
  },
];

export default About_Render;
