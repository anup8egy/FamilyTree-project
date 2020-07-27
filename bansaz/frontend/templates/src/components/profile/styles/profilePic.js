const ProfilePicStyle = () => ({
  profile_root: {
    width: 200,
    height: 200,
    background: "#131313de",
  },

  profile_img: {
    height: "auto",
    width: "auto",
  },
  profile_badge: {
    backgroundColor: "#403d3e",
    borderRadius: 100,
    height: 50,
  },

  profile_view_inner_butt: {
    background: "#393535c7",
    transition: "0.3s all",
    "&::before": {
      content: "''",
      position: "absolute",
      color: "#bdbdbded",
      fontSize: "0.6em",
      left: 0,
      textIndent: 5,
    },

    "&:hover": {
      borderRadius: 10,
      width: 60,
      padding: "0px 5px",
      "& button": {
        left: 20,
      },

      "&::before": {
        content: "'View'",
      },
    },
  },

  profile_add_inner_butt: {
    background: "#393535c7",
    transition: "0.3s all",

    "&::before": {
      content: "''",
      position: "absolute",
      color: "#bdbdbded",
      fontSize: "0.6em",
      left: 0,
      textIndent: 5,
    },

    "&:hover": {
      borderRadius: 10,
      width: 60,
      padding: "0px 5px",

      "& button": {
        left: 20,
      },

      "&::before": {
        content: "'Upload'",
      },
    },
  },

  icons_styling: {
    color: "#8a8787",
  },
});

export default ProfilePicStyle;
