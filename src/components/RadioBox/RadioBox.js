import React from "react";
import classes from "./RadioBox.module.scss";

function RadioBox(props) {
  const { id, label, ...rest } = props;
  return (
    <div className={classes.radio}>
      <label htmlFor={id}>
        <input id={id} type="radio" {...rest} />
        <span className={classes.radio__span} />
        {label}
      </label>
    </div>
  );
}

export default RadioBox;
