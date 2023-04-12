import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdWatchLater } from "react-icons/md";
import classes from "./FindTable.module.scss";

function FindTable({
  onClick,
  numPeople,
  setNumPeople,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleNumPeopleChange = (num) => {
    setNumPeople(num);
    setShowDropdown(false);
  };
  const times = [];
  for (let hour = 12; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
      times.push(time);
    }
  }
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  return (
    <div className={classes.table}>
      <div className={classes.table__content}>
        <div
          className={classes.table__content__div}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <BsFillPersonFill color="white" size={30} />
          <p>{numPeople} {numPeople === 1 ? "Person" : "People"}</p>
          <IoIosArrowDown color="white" size={30} />
          {showDropdown && (
            <div className={classes.table__content__div__dropdown}>
              {Array.from(Array(20).keys()).map((number) => (
                <div
                  key={number}
                  onClick={() => handleNumPeopleChange(number + 1)}
                  className={classes.table__content__div__dropdown__option}
                >
                  {number + 1} {number + 1 === 1 ? "Person" : "People"}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={classes.table__content__vertical}></div>
        <div className={classes.table__content__div}>
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className={classes.table__content__vertical}></div>
        <div
          className={classes.table__content__div}
          onClick={() => setShowTime(!showTime)}
        >
          <MdWatchLater color="white" size={30} />
          <p>{selectedTime || "Select a time"}</p>
          <IoIosArrowDown color="white" size={30} />
          {showTime && (
            <div className={classes.table__content__div__dropdown}>
              {times.map((time, index) => (
                <div
                  key={index}
                  className={classes.table__content__div__dropdown__option}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={classes.table__button} onClick={onClick}>
        Find a table
      </div>
    </div>
  );
}

export default FindTable;
