import React from "react";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
// Styling
const style_profile_pic = makeStyles(() => ({
  root: {
    backgroundColor: "#21222166",
  },
}));
const ProfilePicLoading = () => {
  const classes = style_profile_pic();
  return (
    <Skeleton
      height={200}
      width={200}
      variant="circle"
      classes={{ root: classes.root }}
    />
  );
};
export { ProfilePicLoading };
