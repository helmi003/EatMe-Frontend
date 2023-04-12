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
import DropDown from "../components/DropDown/DropDown";
import { toast } from "react-toastify";

function Reservation() {
  const [number, setNumber] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [findTable, setFindTable] = useState(true);
  const [selected, setSelected] = useState("Select an ocassion (Optional)");
  const [numPeople, setNumPeople] = useState(2);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Full name",
      placeholder: "Enter your full name",
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
  ];
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const options = [
    "Birthday",
    "Anniversary",
    "Date",
    "Special Occassion",
    "Buisness Meal",
  ];
  const handleSetFindTable = () => {
    if (selectedTime === null || selectedDate === "") {
      toast.error("You have to select a date and time first");
    } else {
      setFindTable(false);
    }
  };
  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
    if (Object.keys(validate(values)).length === 0) {
      console.log("jawek bhyy")
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <div className={classes.container__reservation}>
      <h1>
        Reservation at <span>Eat Me</span>
      </h1>

      <div className={classes.container__reservation__content}>
        <div className={classes.container__reservation__content__title}>
          <h2 style={{ color: findTable ? "#F85649" : "inherit" }}>
            1. Find a table
          </h2>
          <h2 style={{ color: findTable ? "inherit" : "#F85649" }}>
            2. Your details
          </h2>
        </div>
        <div className={classes.container__reservation__content__line}>
          <hr
            style={{
              borderColor: findTable ? "#F85649" : "black",
              backgroundColor: findTable ? "#F85649" : "black",
              width: "200px",
              height: "3px",
            }}
          />
          <hr
            style={{
              borderColor: findTable ? "black" : "#F85649",
              backgroundColor: findTable ? "black" : "#F85649",
              width: "100%",
              height: "3px",
            }}
          />
        </div>
        {findTable ? (
          <div>
            <FindTable
              onClick={handleSetFindTable}
              numPeople={numPeople}
              setNumPeople={setNumPeople}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <p>
              <EatMe /> provides you with the best the nicest way to make a
              table reservation for you and your friends or beloved ones.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          <div className={classes.container__reservation__details}>
            
              <div className={classes.container__reservation__details__left}>
                {inputs.map((input) => (
                  <Input
                    key={input.id}
                    {...input}
                    value={values[input.id]}
                    onChange={onChange}
                  />
                ))}
                <PhoneNumber
                  label="Phone number"
                  extraStyles={{ backgroundColor: "white" }}
                  value={number}
                  onChange={setNumber}
                  required
                />
                <br />
                <DropDown
                  buttonColor={{ backgroundColor: "white" }}
                  extraStyles={{ zIndex: 2 }}
                  selected={selected}
                  setSelected={setSelected}
                  options={options}
                />
                <Input
                  id="request"
                  name="request"
                  type="text"
                  label="Special request"
                  placeholder="Add your special request (Optional)"
                  value={values["request"]}
                  onChange={onChange}
                />
                <br />
                <CheckBox
                  label="Yes I, want to get text updates and reminders about my reservations.*"
                  check={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                />
              </div>
              <div className={classes.container__reservation__details__right}>
                <div>
                  Your reservation at <EatMe /> will be like:
                </div>
                <div
                  className={
                    classes.container__reservation__details__right__inputs
                  }
                >
                  <BsFillCalendarDateFill size={30} />
                  <p>{formatDate(selectedDate)} </p>
                </div>
                <div
                  className={
                    classes.container__reservation__details__right__inputs
                  }
                >
                  <MdWatchLater size={30} />
                  <p>{selectedTime} </p>
                </div>
                <div
                  className={
                    classes.container__reservation__details__right__inputs
                  }
                >
                  <BsPersonFill size={30} />
                  <p>{numPeople} {numPeople === 1 ? "Person" : "People"}</p>
                </div>
                <div
                  className={
                    classes.container__reservation__details__right__inputs
                  }
                >
                  <MdLocationOn size={30} />
                  <p>Tunisia - Beni Rabia 4015, 130 Rue Hsine Eloued Sousse </p>
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
                  request , All request for seating is not guaranteed, but we
                  will try our very best to accommodate.
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
          </form>
        )}
      </div>
    </div>
  );
}

export default Reservation;
