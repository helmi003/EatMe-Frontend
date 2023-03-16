import React from "react";
import classes from "./DateInput.module.scss";

function DateInput(props) {
  const { id, label,extraStyles, ...rest } = props;

  return (
    <div className={classes.DateInput}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} {...rest} type="date" style={extraStyles}/>
    </div>
  );
}

export default DateInput;
