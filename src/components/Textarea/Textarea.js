import React, { useState } from "react";
import classes from "./Textarea.module.scss";

const Textarea = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, id, errorMessage, ...rest } = props;

  return (
    <div className={classes.Textarea}>
      {label && <label htmlFor={id}>{label}</label>}
      <br />
      <textarea
        id={id}
        {...rest}
        rows="5"
        cols="40"
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
      />
      {errorMessage && (
        <div className={classes.Textarea__error}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Textarea;
