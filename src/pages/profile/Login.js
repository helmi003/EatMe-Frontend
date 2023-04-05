import React, { useEffect, useState } from "react";
import classes from "../../components/Layout/Layout.module.scss";
import loginImage from "../../assets/images/login.jpg";
import CheckBox from "../../components/CheckBox/CheckBox";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { getUserLoading, login,getUserStatus, getUserError } from "../../features/authSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

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
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const loading = useSelector(getUserLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (userStatus === "logedIn") {
      toast.success("Loged in successfully");
      navigate("/");
    } else if (userStatus === "error") {
      toast.error(error);
    }
  }, [userStatus, error, navigate]);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: values["email"],
        password: values["password"],
      })
    );
    setValues({ password: "" });
  };

  const [isChecked, setIsChecked] = useState(false);
  return loading ? (
    <Loading />
  ) : (
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
              check={isChecked.toString()}
              onChange={(e) => setIsChecked(!isChecked)}
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
