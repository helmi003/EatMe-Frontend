import React from "react";
import classes from "./Copyright.module.scss";

function Copyright() {
  return (
    <div className={classes.copyright}>
      <p>Copyright 2023 - © <span>Eat Me</span> - All rights reserved</p>
    </div>
  );
}

export default Copyright;
