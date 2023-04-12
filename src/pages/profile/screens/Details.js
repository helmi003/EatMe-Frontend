import React, { useState, useEffect } from "react";
import classes from "../../../components/Layout/Layout.module.scss";
import RadioBox from "../../../components/RadioBox/RadioBox";
import PhoneNumber from "../../../components/PhoneNumber/PhoneNumber";
import Input from "../../../components/Input/Input";
import DateInput from "../../../components/DateInput/DateInput";
import Button from "../../../components/Button/Button";
import CountrySelector from "../../../components/CountrySelector/CountrySelector";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserStatus,
  getUserError,
  getUserLoading,
  updateProfile,
} from "../../../features/authSlice";
import { updateStatus } from "../../../features/authSlice";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
function Profile() {
  const output = window.localStorage.getItem("user");
  const user = JSON.parse(output);
  const today = new Date().toISOString().split("T")[0];
  const [gender, setGender] = useState(user.gender);
  const [number, setNumber] = useState(user.phone);
  const dateObj = new Date(user.date);
  const formattedDate = dateObj.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [formErrors, setFormErrors] = useState({});
  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const loading = useSelector(getUserLoading);
  const dispatch = useDispatch();
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
      label: "Full name",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      errorMessage: formErrors.name,
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
      disabled: true,
    },
    {
      id: "address",
      name: "address",
      type: "text",
      placeholder: "Enter your address",
      label: "Address - Street",
    },
  ];

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
  const validate = (values) => {
    const errors = {};
    const nameRgrex = /^[A-Za-z ]{3,30}$/;
    if (!nameRgrex.test(values.name)) {
      errors.name =
        "Only alphabets, spaces and numbers are allowed and minimum length of 3 and maximum of 30";
    }
    return errors;
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
    if (Object.keys(validate(values)).length === 0) {
      dispatch(
        updateProfile({
          username: values["name"],
          address: values["address"],
          country: values["country"],
          postal: values["code"],
          state: values["state"],
          region: values["region"],
          gender: gender,
          phone: number,
          date: selectedDate,
        })
      );
    }
  };

  useEffect(() => {
    if (userStatus === "updatedProfile") {
      toast.success("Profile updated successfully");
      dispatch(updateStatus());
    } else if (userStatus === "error") {
      toast.error(error);
    }
  }, [userStatus, error, dispatch]);
  return loading ? (
    <Loading />
  ) : (
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
      <form onSubmit={handleUpdateProfile}>
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
            onChange={(e) => setSelectedDate(e.target.value)}
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
      </form>
    </div>
  );
}

export default Profile;
