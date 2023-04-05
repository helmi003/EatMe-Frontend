import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import classes from "../../../components/Layout/Layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  changePassword,
  getUserError,
  getUserLoading,
  getUserStatus,
} from "../../../features/authSlice";
import Loading from "../../../components/Loading/Loading";

function ChangePassword() {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const loading = useSelector(getUserLoading);
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
      required: true,
    },
    {
      id: "newPassword",
      name: "newPassword",
      type: "password",
      label: "New password",
      placeholder: "Enter your new password",
      errorMessage: formErrors.newPassword,
      required: true,
    },
    {
      id: "matchPassword",
      name: "matchPassword",
      type: "password",
      label: "Password confirmation",
      placeholder: "Enter the same password",
      errorMessage: formErrors.matchPassword,
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
    if (Object.keys(validate(values)).length === 0) {
      dispatch(
        changePassword({
          oldPassword: values["oldPassword"],
          newPassword: values["newPassword"],
          confirmPassword: values["matchPassword"],
        })
      );
    }
  };
  const validate = (values) => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(values.newPassword)) {
      errors.newPassword =
        "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (values.newPassword !== values.matchPassword) {
      errors.matchPassword = "Password doesn't match";
    }
    return errors;
  };
  useEffect(() => {
    if (userStatus === "passwordChanged") {
      toast.success("Password modified successfully");
      setValues({ oldPassword: "", newPassword: "", matchPassword: "" });
    } else if (userStatus === "error") {
      toast.error(error);
    }
  }, [error, userStatus]);
  return loading ? (
    <Loading />
  ) : (
    <div className={classes.container__changePassword}>
      <h1>ChangePassword</h1>
      <br />
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

export default ChangePassword;
