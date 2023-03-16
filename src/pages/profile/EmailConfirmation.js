import React from "react";
import { Link } from "react-router-dom";
import classes from "../../components/Layout/Layout.module.scss";
import { FaEnvelopeOpenText } from "react-icons/fa";

function EmailConfirmation() {
  return (
    <div className={classes.container__emailConfirmation}>
      <div className={classes.container__emailConfirmation__content}>
        <FaEnvelopeOpenText
          size={100}
          className={classes.container__emailConfirmation__content__icon}
        />
        <br />
        <h1>Check your email</h1>
        <br />
        <p className={classes.container__emailConfirmation__content__text}>
          We have sent a password recover instructions to your email.
        </p>
        <br />
        <p>
          Go to login screen?{" "}
          <span>
            <Link to="/Login">Sign in</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default EmailConfirmation;
