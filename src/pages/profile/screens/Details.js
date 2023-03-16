import React, { useState } from "react";
import classes from "../../../components/Layout/Layout.module.scss";
import RadioBox from "../../../components/RadioBox/RadioBox";
import PhoneNumber from "../../../components/PhoneNumber/PhoneNumber";
import Input from "../../../components/Input/Input";
import DateInput from "../../../components/DateInput/DateInput";
import Button from "../../../components/Button/Button";
import CountrySelector from "../../../components/CountrySelector/CountrySelector";

function Profile() {
  const radios = [
    {
      id: "male",
      name: "gender",
      label: "Male",
      value: "male",
    },
    {
      id: "female",
      name: "gender",
      label: "Female",
      value: "female",
    },
  ];
  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      errorMessage:
        "Only alphabets, spaces and numbers are allowed and maximum length of 30",
      label: "Full name",
      pattern: "^[A-Za-z0-9 ]{0,30}$",
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      errorMessage: "This email address is invalid",
      label: "Email",
      required: true,
    },
    {
      id: "address",
      name: "address",
      type: "text",
      placeholder: "Enter your address",
      errorMessage: "The address should not be empty",
      label: "Address",
      required: true,
    },
  ];
  const today = new Date().toISOString().split("T")[0];
  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    date: "",
    location: "",
    post: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [gender, setGender] = useState("male");
  const [number, setNumber] = useState();
  const [selectedDate, setSelectedDate] = useState(today);
  return (
    <div className={classes.container__details}>
      <h1>Personal information</h1>
      <br />
      <div className={classes.container__details__gender}>
        {radios.map((item) => (
          <RadioBox
            key={item.id}
            {...item}
            checked={gender === item.value}
            onChange={(e) => setGender(e.target.value)}
          />
        ))}
      </div>
      {inputs.map((input) => (
        <Input
          extraStyles={{ backgroundColor: "#F0F0F7" }}
          key={input.id}
          {...input}
          value={values[input.id]}
          onChange={onChange}
        />
      ))}
      <br />
      <div className={classes.container__details__info}>
        <PhoneNumber
          value={number}
          label="Phone number"
          onChange={(e) => setNumber(e.target.number)}
          extraStyles={{ width: "200px" }}
        />
        <DateInput
          extraStyles={{ backgroundColor: "#F0F0F7", width: "200px" }}
          id="date"
          name="date"
          label="Date of birth"
          max={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.selectedDate)}
        />
      </div>
      <div className={classes.container__details__info}>
        <CountrySelector
          extraStyles={{
            backgroundColor: "#F0F0F7",
            fontSize: 15,
            marginRight: "50px",
          }}
          region={values["region"]}
          country={values["country"]}
          setRegion={(region) => setValues((prev) => ({ ...prev, region }))}
          setCountry={(country) => setValues((prev) => ({ ...prev, country }))}
        />
        <Input
          extraStyles={{ backgroundColor: "#F0F0F7", width: "200px" }}
          id="post"
          name="post"
          type="text"
          placeholder="Enter your post code"
          label="Post code"
          value={values.post}
          onChange={onChange}
        />
      </div>
      <br />
      <Button
        extraStyles={{
          position: "relative",
          transform: "translateX(-50%)",
          left: "50%",
        }}
      >
        Save changes
      </Button>
    </div>
  );
}

export default Profile;
