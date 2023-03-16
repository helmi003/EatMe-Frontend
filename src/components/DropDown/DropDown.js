import React, { useState } from "react";
import classes from "./DropDown.module.scss";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaSortAmountDownAlt } from "react-icons/fa";

function DropDown({ extraStyles, selected, setSelected, options }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={classes.dropDown} style={extraStyles}>
      <div
        className={classes.dropDown__btn}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={classes.dropDown__btn__sort}>
          <FaSortAmountDownAlt color="#B3B3B3" />
          {selected}
        </div>
        {isActive ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />}
      </div>
      {isActive && (
        <div className={classes.dropDown__content}>
          {options.map((option) => (
            <div
              key={option}
              className={classes.dropDown__content__items}
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
