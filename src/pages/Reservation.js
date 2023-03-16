import React, { useState } from "react";
import EatMe from "../components/EatMe/EatMe";
import FindTable from "../components/FindTable/FindTable";
import classes from "../components/Layout/Layout.module.scss";
import Input from "../components/Input/Input";
import PhoneNumber from "../components/PhoneNumber/PhoneNumber";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Button from "../components/Button/Button";
import CheckBox from "../components/CheckBox/CheckBox";

function Reservation() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: null,
    ocassion: "",
    request: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className={classes.container__reservation}>
      <div>
        <h1>
          Reservation at <span>Eat Me</span>
        </h1>
        <div className={classes.container__reservation__content}>
          <div className={classes.container__reservation__content__title}>
            <h2 style={{ color: "#F85649" }}>1. Find a table</h2>
            <h2>2. Your details</h2>
          </div>
          <div className={classes.container__reservation__content__line}>
            <hr
              style={{
                borderColor: "#F85649",
                backgroundColor: "#F85649",
                width: "200px",
                height: "3px",
              }}
            />
            <hr
              style={{
                borderColor: "black",
                backgroundColor: "black",
                width: "100%",
                height: "3px",
              }}
            />
          </div>
          <FindTable />
          <p>
            <EatMe /> provides you with the best the nicest way to make a table
            reservation for you and your friends or beloved ones.
          </p>
          <div className={classes.container__reservation__details}>
            <div className={classes.container__reservation__details__left}>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                errorMessage="Only alphabets, spaces and numbers are allowed and the length should be between 3 and 30"
                pattern="^[A-Za-z0-9 ]{3,30}$"
                required
                value={values["name"]}
                onChange={onChange}
              />
              <br />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                errorMessage="Only alphabets, spaces and numbers are allowed and the length should be between 3 and 30"
                pattern="^[A-Za-z0-9 ]{3,30}$"
                required
                value={values["email"]}
                onChange={onChange}
              />
              <br />
              <PhoneNumber
                extraStyles={{ backgroundColor: "white" }}
                value={values["number"]}
                onChange={onChange}
              />
              <br />
              <Input
                id="ocassion"
                name="ocassion"
                type="text"
                placeholder="Select an ocassion (Optional)"
                value={values["ocassion"]}
                onChange={onChange}
              />
              <br />
              <Input
                id="request"
                name="request"
                type="text"
                placeholder="Add your special request (Optional)"
                value={values["request"]}
                onChange={onChange}
              />
              <br />
              <CheckBox
                label="Yes I, want to get text updates and reminders about my reservations.*"
              ></CheckBox>
            </div>
            <div className={classes.container__reservation__details__right}>
              <EatMe />
              <div
                className={
                  classes.container__reservation__details__right__inputs
                }
              >
                <BsFillCalendarDateFill size={30} />
                <p>Wednesday, February 14 </p>
              </div>
              <div
                className={
                  classes.container__reservation__details__right__inputs
                }
              >
                <MdWatchLater size={30} />
                <p>7:00 PM </p>
              </div>
              <div
                className={
                  classes.container__reservation__details__right__inputs
                }
              >
                <BsPersonFill size={30} />
                <p>2 People </p>
              </div>
              <div
                className={
                  classes.container__reservation__details__right__inputs
                }
              >
                <MdLocationOn size={30} />
                <p>Tunisia - Beni Rabia 4015,130 Rue Hsine Eloued Sousse </p>
              </div>
              <hr />
              <h3>What to know before you go</h3>
              <br />
              <p>
                <span>
                  A note from the restaurant <br />
                </span>
                Thank you for choosing to dine with us at EatMe. Should your
                plans change, please let us know in advance. Please call us at
                (+216)55-555-555 for inquiries or special events. We at EatMe
                value your patronage and will do our best to accommodate all
                request , All request for seating is not guaranteed, but we will
                try our very best to accommodate.
              </p>
              <br />
              <Button
                extraStyles={{
                  position: "relative",
                  transform: "translateX(-50%)",
                  left: "50%",
                }}
              >
                Confirm reservation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
