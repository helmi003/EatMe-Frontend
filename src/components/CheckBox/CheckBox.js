import React from "react";
import classes from "./CheckBox.module.scss";
import { BsCheckLg } from "react-icons/bs";

function CheckBox(props) {
  const { label,onClick, ...rest } = props;
  return (
    <div className={classes.checkbox}>
      <div className={classes.checkbox__input} onClick={onClick}>
        <input type="checkbox" {...rest} />
        {rest.check && (
          <>
            <div className={classes.checkbox__input__before}></div>
            <div className={classes.checkbox__input__after}>
              <BsCheckLg size={13}/>
            </div>
          </>
        )}
      </div>
      <label htmlFor={rest.id}>{label}</label>
    </div>
  );
}

export default CheckBox;
