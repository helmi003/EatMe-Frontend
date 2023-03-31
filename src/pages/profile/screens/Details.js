import React, { useState } from "react";
import classes from "../../../components/Layout/Layout.module.scss";
import RadioBox from "../../../components/RadioBox/RadioBox";
import PhoneNumber from "../../../components/PhoneNumber/PhoneNumber";
import Input from "../../../components/Input/Input";
import DateInput from "../../../components/DateInput/DateInput";
import Button from "../../../components/Button/Button";
import CountrySelector from "../../../components/CountrySelector/CountrySelector";
function Profile() {
  const output = window.localStorage.getItem("user");
  const user = JSON.parse(output);
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
      label: "Address - Street",
      required: true,
    },
  ];
  const today = new Date().toISOString().split("T")[0];
  const [values, setValues] = useState({
    name: user.username,
    email: user.email,
    address: user.address,
    country: user.country,
    code: user.postal,
    state: user.state,
    region: user.region,
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [gender, setGender] = useState(user.gender);
  const [number, setNumber] = useState(user.phone);
  const dateObj = new Date(user.date);
  console.log(number)
  const formattedDate = dateObj.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(formattedDate);
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
          onChange={setNumber}
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
      <CountrySelector
        extraStyles={{
          backgroundColor: "#F0F0F7",
          fontSize: 15,
          marginRight: "50px",
        }}
        region={values["state"]}
        country={values["country"]}
        setRegion={(state) => setValues((prev) => ({ ...prev, state }))}
        setCountry={(country) => setValues((prev) => ({ ...prev, country }))}
      />
      <div className={classes.container__details__info}>
        <Input
          extraStyles={{ backgroundColor: "#F0F0F7", width: "200px" }}
          id="code"
          name="code"
          type="text"
          placeholder="Enter your zip code"
          label="Zip code"
          value={values.code}
          onChange={onChange}
        />
        <Input
          extraStyles={{ backgroundColor: "#F0F0F7", width: "200px" }}
          id="region"
          name="region"
          type="text"
          placeholder="Enter your region"
          label="Region"
          value={values.region}
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
