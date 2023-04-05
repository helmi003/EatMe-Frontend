import React, { useState } from "react";
import classes from "./Input.module.scss";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const Input = (props) => {
  const [focused, setFocused] = useState(false);
  const { id, label, errorMessage, type, extraStyles, ...rest } = props;
  const [isInvisible, setIsInvisible] = useState(false);
  return (
    <div className={classes.Input}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={classes.Input__password} style={extraStyles}>
        <input
          id={id}
          {...rest}
          type={
            type === "password" ? (isInvisible ? "text" : "password") : "text"
          }
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
        />
        {type === "password" &&
          (isInvisible ? (
            <AiFillEye
              onClick={() => {
                setIsInvisible(!isInvisible);
              }}
              size={25}
              cursor="pointer"
            />
          ) : (
            <AiFillEyeInvisible
              onClick={() => {
                setIsInvisible(!isInvisible);
              }}
              size={25}
              cursor="pointer"
            />
          ))}
      </div>
      {errorMessage && (
        <div className={classes.Input__error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
