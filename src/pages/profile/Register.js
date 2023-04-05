import React, { useEffect, useState } from "react";
import classes from "../../components/Layout/Layout.module.scss";
import registerImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  getUserStatus,
  getUserError,
  getUserLoading,
} from "../../features/authSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Full name",
      placeholder: "Enter your full name",
      errorMessage: formErrors.name,
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      errorMessage: formErrors.email,
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      errorMessage: formErrors.password,
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const loading = useSelector(getUserLoading);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
    if (Object.keys(validate(values)).length === 0) {
      dispatch(
        register({
          username: values["name"],
          email: values["email"],
          password: values["password"],
        })
      );
    }
  };
  useEffect(() => {
    if (userStatus === "registred") {
      toast.success("Account successfully created");
      navigate("/Login");
    } else if (userStatus === "error") {
      toast.error(error);
    }
  }, [error, userStatus, navigate]);
  const validate = (values) => {
    const errors = {};
    const nameRgrex = /^[A-Za-z ]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!nameRgrex.test(values.name)) {
      errors.name =
        "Only alphabets, spaces and numbers are allowed and minimum length of 3 and maximum of 30";
    }
    if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return errors;
  };
  return loading ? (
    <Loading />
  ) : (
    <div className={classes.container__login}>
      <img src={registerImage} alt="register" />
      <div className={classes.container__login__form}>
        <h1>Register</h1>
        <br />
        <h3>Please fill in the form below</h3>
        <p>Sign up with your name, email address and password.</p>
        <br />
        <form onSubmit={handleSubmit}>
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
        </form>
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
