import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import classes from "../../../components/Layout/Layout.module.scss";

function ChangePassword() {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    matchPassword: "",
  });
  const inputs = [
    {
      id: "oldPassword",
      name: "oldPassword",
      type: "password",
      label: "Old password",
      placeholder: "Enter your old password",
      errorMessage: "Your password is incorrect",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      required: true,
    },
    {
      id: "newPassword",
      name: "newPassword",
      type: "password",
      label: "New password",
      placeholder: "Enter your new password",
      errorMessage:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      required: true,
    },
    {
      id: "matchPassword",
      name: "matchPassword",
      type: "password",
      label: "Password confirmation",
      placeholder: "Enter the same password",
      errorMessage: "Password doesn't match",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className={classes.container__changePassword}>
      <h1>ChangePassword</h1>
      <br />
      {inputs.map((input) => (
        <div>
          <Input
            key={input.id}
            extraStyles={{ backgroundColor: "#F0F0F7" }}
            {...input}
            value={values[input.id]}
            onChange={onChange}
          />
          <br />
        </div>
      ))}
      <Button
        extraStyles={{
          position: "relative",
          transform: "translateX(-50%)",
          left: "50%",
        }}
      >
        Save changes
      </Button>
    </div>
  );
}

export default ChangePassword;
