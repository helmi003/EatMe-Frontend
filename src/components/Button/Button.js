import React from "react";
import classes from "./Button.module.scss";
function Button({ children,extraStyles }) {
  return <button style={extraStyles} className={classes.Button}>{children}</button>;
}

export default Button;
