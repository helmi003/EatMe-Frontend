import React from "react";
import Loader from "react-spinners/PacmanLoader";
import classes from "../Loading/Loading.module.scss";

function Loading() {
  return (
    <div className={classes.loading}>
      <Loader color={"#F85649"}/>
    </div>
  );
}
export default Loading;
