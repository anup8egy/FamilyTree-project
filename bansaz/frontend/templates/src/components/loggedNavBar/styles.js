const NavStyle = () => ({
  deskroot: {
    backgroundColor: "#0d0d0d",
    boxShadow: "0px 0px 10px -3px #ffffff4d",
  },

  paper_root: {
    minWidth: "85vw",
    backgroundColor: "#0f0f0f",
    display: "grid",
    gridTemplate: "auto / 1fr",
    alignContent: "baseline",
    justifyItems: "center",
    gridGap: 10,
  },

  icon_ava: {
    color: "#a89a9a",
    backgroundColor: "#222121",
    marginLeft: 10,
  },

  dash_mob_logo: {
    height: 100,
    width: 100,
    backgroundColor: "#24232387",
  },

  profile_pic_nav: {
    height: 80,
    width: 80,
    backgroundColor: "#24232387",
    marginLeft: 10,
  },

  desktop_app_logo_nav: {
    height: 60,
    width: 60,
    backgroundColor: "#24232387",
  },

  smallIconsColor: {
    color: "white",
  },

  desktop_controls: {
    marginRight: 20,
  },

  desktopnavAvatar: {
    color: "#a89a9a",
    backgroundColor: "#222121",
    overflow: "visible",
  },

  notificationBadge: {
    backgroundColor: "#9f0b0b",
  },

  desk_nav_tooltip: {
    backgroundColor: "#404040",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8em",
    minWidth: 90,
    minHeight: 20,
    color: "#cecaca",
  },

  profilePaper: {
    background: "#1c1b1bf2",
    height: 350,
    width: 250,
    padding: "2px 10px",
  },

  createPaper: {
    background: "#1c1b1bf2",
    width: 250,
    padding: "2px 10px",
  },

  profilePaperList: {
    display: "grid",
    gridGap: 3,
    alignContent: "center",
    justifyItems: "center",
  },

  mob_nav_create_drop: {
    width: "95%",
    minHeight: 50,
    background: "#151515ed",
    color: "#b9b5b5",
    fontSize: "1.1em",
    borderRadius: 10,
    padding: "5px 0px",
    fontSize: "0.9em",
  },

  mob_expanded_root: {
    position: "relative",
    background: "#1a1a1a",
    zIndex: 5,
  },
});

export default NavStyle;
