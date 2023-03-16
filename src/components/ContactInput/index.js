import React, { useState } from "react";
import classes from "./ContactInput.module.scss";

const ContactInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, id, errorMessage, ...rest } = props;

  return (
    <div className={classes.ContactInput}>
      {label && <label htmlFor={id}>{label}</label>}
      <br />
      <input
        id={id}
        {...rest}
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
      />
      {errorMessage &&(
        <div className={classes.ContactInput__error}>{errorMessage}</div>
      )}
    </div>
  );
};

export default ContactInput;
