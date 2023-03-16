import React, { useState } from "react";
import classes from "../../components/Layout/Layout.module.scss";
import registerImage from "../../assets/images/register.jpg";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const Register = () => {
  const [values, setValues] = useState({
    name:"",
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      label:"Full name",
      placeholder:"Enter your full name",
      errorMessage:
        "Only alphabets, spaces and numbers are allowed and maximum length of 30",
      pattern: "^[A-Za-z0-9 ]{0,30}$",
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label:"Email",
      placeholder:"Enter your email",
      errorMessage: "This email address is invalid",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label:"Password",
      placeholder:"Enter your password",
      errorMessage:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className={classes.container__login}>
      <img src={registerImage} alt="register" />
      <div className={classes.container__login__form}>
        <h1>Register</h1>
        <br />
        <h3>Please fill in the form below</h3>
        <p>Sign up with your name, email address and password.</p>
        <br />
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            value={values[input.id]}
            onChange={onChange}
          />
        ))}
        <br />
        <Button
          extraStyles={{
            position: "relative",
            transform: "translateX(-50%)",
            left: "50%",
          }}
        >
          Sign up
        </Button>
        <br />
        <br />
        <p>
        You have an account?{" "}
          <span>
            <Link to="/Login">Sign in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
