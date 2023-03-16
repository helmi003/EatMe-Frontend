import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import classes from "./FindTable.module.scss";


function FindTable() {
  //   const [date, setDate] = useState();
  //   console.log("Date: ", date);
  return (
    <div className={classes.table}>
      <div className={classes.table__content}>
        <div className={classes.table__content__div}>
          <BsFillPersonFill color="white" size={30} />
          <p>2 People</p>
          <IoIosArrowDown color="white" size={30} />
        </div>
        <div className={classes.table__content__vertical}></div>
        <div className={classes.table__content__div}>
          <BsFillCalendarDateFill color="white" size={30} />
          <p>Feb 14, 2023</p>
          <IoIosArrowDown color="white" size={30} />
        </div>
        <div className={classes.table__content__vertical}></div>
        <div className={classes.table__content__div}>
          <MdWatchLater color="white" size={30} />
          <p>7:00 PM</p>
          <IoIosArrowDown color="white" size={30} />
        </div>
      </div>
      <div className={classes.table__button}>Find a table</div>
    </div>
  );
}

export default FindTable;
