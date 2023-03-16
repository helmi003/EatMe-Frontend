import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from "../../components/Layout/Layout.module.scss";
import "react-toastify/dist/ReactToastify.css";
// import emailjs from "@emailjs/browser";
// import { ToastContainer, toast } from "react-toastify";

function ForgetPassword() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const sendEmail = (e) => {
    
    e.preventDefault();
    // emailjs
    //   .sendForm(
    //     "service_jx48jui",
    //     "template_48lkeek",
    //     e.target,
    //     "rAYhMf71cel6tF8T1"
    //   )
    //   .then(
    //     () => {
    //       toast.success("Your message has been sent successfully", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //       });
    //     },
    //     () => {
    //       toast.error("An error has accured while sending the data", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //       });
    //     }
    //   );
    navigate('/EmailConfirmation');
    setValue("");
  };
  return (
    <div className={classes.container__forgetPassword}>
      <div className={classes.container__forgetPassword__content}>
      {/* <ToastContainer /> */}
        <form onSubmit={sendEmail}>
          <h1>Reset password</h1>
          <br />
          <p>
            Enter the email assosciated with your account and we will send an
            email with instructions to reset your password.
          </p>
          <br />
          <Input
            id="email"
            name="email"
            type="email"
            errorMessage="This email address is invalid"
            label="Email"
            placeholder="Enter your email address"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <br />
          <Button
            extraStyles={{
              position: "relative",
              transform: "translateX(-50%)",
              left: "50%",
            }}
          >
            Send instructions
          </Button>
          <br />
          <br />
          <p>
            You remember your account?{" "}
            <span>
              <Link to="/Login">Sign in</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
