import React, { useState } from "react";
import classes from "../../components/Layout/Layout.module.scss";
import loginImage from "../../assets/images/login.jpg";
import CheckBox from "../../components/CheckBox/CheckBox";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const inputs = [
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
      <div className={classes.container__login__form}>
        <h1>Login</h1>
        <br />
        <h3>Welcome back</h3>
        <p>Sign in with your email address and password.</p>
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
        <div className={classes.container__login__form__common}>
          <CheckBox
            id="remember"
            name="remember"
            value="remember"
            label="Remember me"
          />
          <Link to="/ForgetPassword">Forget password?</Link>
        </div>
        <br />
        <Button
          extraStyles={{
            position: "relative",
            transform: "translateX(-50%)",
            left: "50%",
          }}
        >
          Sign in
        </Button>
        <br />
        <br />
        <p>
          Don't have an account?{" "}
          <span>
            <Link to="/Register">Sign up</Link>
          </span>
        </p>
      </div>
      <img src={loginImage} alt="login" />
    </div>
  );
};

export default Login;
