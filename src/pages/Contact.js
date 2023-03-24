import React, { useState } from "react";
import classes from "../components/Layout/Layout.module.scss";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaFax } from "react-icons/fa";
import Button from "../components/Button/Button";
import Input from "../components/ContactInput/index";
import Textarea from "../components/Textarea/Textarea";

function Contact() {
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_jx48jui",
        "template_dscgqg8",
        e.target,
        "rAYhMf71cel6tF8T1"
      )
      .then(
        () => {
          toast.success("Your message has been sent successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        },
        () => {
          toast.error("An error has accured while sending the data", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      );
    setValues({ name: "", subject: "", email: "", message: "" });
  };
  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      errorMessage:
        "Only alphabets, spaces and numbers are allowed and the length should be between 3 and 20",
      label: "Name",
      pattern: "^[A-Za-z0-9 ]{3,20}$",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      errorMessage: "This email address is invalid",
      label: "Email",
      required: true,
    },
    {
      id: "subject",
      name: "subject",
      type: "text",
      errorMessage: "The subject should not be empty",
      label: "Subject",
      required: true,
    },
  ];
  const textValue = {
    id: "message",
    name: "message",
    type: "text",
    errorMessage: "The message should contain at least 10 characters",
    label: "Message",
    required: true,
    pattern: "[\\s\\S]{10,}",
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className={classes.container__contact}>
      <div className={classes.container__contact__form}>
        <h1>Contact us</h1>
        <form onSubmit={sendEmail}>
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              value={values[input.id]}
              onChange={onChange}
            />
          ))}
          <Textarea
            key={textValue.id}
            {...textValue}
            value={values.message}
            onChange={onChange}
          />
          <br />
          <Button
            extraStyles={{
              position: "relative",
              transform: "translateX(-50%)",
              left: "50%",
              marginBottom: "10px",
            }}
          >
            SUBMIT
          </Button>
        </form>
      </div>
      <div className={classes.container__contact__information}>
        <div className={classes.container__contact__information__card}>
          <MdLocationOn size={80} color="#F85649" />
          <h1>OUR MAIN OFFICE</h1>
          <p>Tunisia - Beni Rabia 4015 130 Rue Hsine Eloued Sousse</p>
        </div>
        <div className={classes.container__contact__information__card}>
          <BsFillTelephoneFill size={60} color="#F85649" />
          <h1>PHONE NUMBER</h1>
          <p>(+216) 55 555 555</p>
        </div>
        <div className={classes.container__contact__information__card}>
          <MdEmail size={70} color="#F85649" />
          <h1>EMAIL</h1>
          <p>EatMeTunisia@gmail.com</p>
        </div>
        <div className={classes.container__contact__information__card}>
          <FaFax size={50} color="#F85649" />
          <h1>FAX</h1>
          <p>1-234-567-8900</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
