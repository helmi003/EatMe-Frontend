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
  getUserSuccess,
  updateProfile,
} from "../../../features/authSlice";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
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
  const formattedDate = dateObj.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const dispatch = useDispatch();
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        username: values["name"],
        email: values["email"],
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
  };
  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const loading = useSelector(getUserLoading);
  const success = useSelector(getUserSuccess);
  useEffect(() => {
    console.log("status=", userStatus);
    if (userStatus === "loading") {
      console.log("loading...");
    } else if (userStatus === "success") {
      toast.success(success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (userStatus === "error") {
      toast.error(error, {
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
  }, [userStatus, error, success]);
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
      </form>
    </div>
  );
}

export default Profile;
