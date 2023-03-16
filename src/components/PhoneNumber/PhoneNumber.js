import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import classes from "./PhoneNumber.module.scss";

function PhoneNumber({ extraStyles, label, ...rest }) {
  return (
    <div className={classes.phone}>
      {label && <label htmlFor="phone">{label}</label>}
      <PhoneInput
        name="phone"
        {...rest}
        className={classes.phone__number}
        style={extraStyles}
        defaultCountry="TN"
        placeholder="Enter phone number"
      />
    </div>
  );
}

export default PhoneNumber;
