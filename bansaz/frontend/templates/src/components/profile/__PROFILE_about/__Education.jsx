import React from "react";

import AboutLayout from "./about_LAYOUT";

function Education() {
  return (
    <AboutLayout
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

export default Education;
