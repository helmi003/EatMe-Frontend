import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./Profile.module.scss";
import ProfileNav from "../ProfileNav/ProfileNav";

const Profile = () => {
  return (
    <div className={classes.Profile}>
      <ProfileNav />
      <Outlet />
    </div>
  );
};

export default Profile;
