import React, { useState } from "react";
import classes from "../../components/Layout/Layout.module.scss";
import loginImage from "../../assets/images/login.jpg";
import CheckBox from "../../components/CheckBox/CheckBox";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import {  getUserError } from "../../features/authSlice";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const inputs = [
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      errorMessage: "This email address is invalid",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      errorMessage:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      // pattern:
      //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    
    try {
      dispatch(
        login({
          email: values["email"],
          password: values["password"],
        })
      );
      navigate('/')
  } catch (err) {
    console.log("error=", error);
  }
  };
  // useEffect(() => {
  //   console.log("userStatus=", userStatus);
  //   if (userStatus === "loading") {
  //     console.log("loading...");
  //   } else if (userStatus === "success") {
  //     console.log("success");
  //     navigate("/");
  //   } else if (userStatus === "error") {
  //     console.log("error=", error);
  //   }
  // }, [userStatus, error, navigate]);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className={classes.container__login}>
      <div className={classes.container__login__form}>
        <h1>Login</h1>
        <br />
        <h3>Welcome back</h3>
        <p>Sign in with your email address and password.</p>
        <br />
        <form onSubmit={handleLogin}>
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
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
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
            // onClick={handleLogin}
          >
            Sign in
          </Button>
        </form>
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
