import React, { useState } from "react";
import classes from "./Counter.module.scss";

function Counter(props) {
  const { quantity, extraStyles} = props;
  let [number, setNumber] = useState(quantity);

  const handleSetNumber = (op) => {
    if (op === "-") {
      if (number > 1) {
        setNumber(number - 1);
      }
    } else {
      if (number < 20) {
        setNumber(number + 1);
      }
    }
  };
  return (
    <div className={classes.Counter} style={extraStyles}>
      <span
        className={classes.Counter__next}
        onClick={() => handleSetNumber("-")}
      >
        -
      </span>
      <div className={classes.Counter__box}>
        <span>{number}</span>
      </div>
      <span
        className={classes.Counter__next}
        onClick={() => handleSetNumber("+")}
      >
        +
      </span>
    </div>
  );
}

export default Counter;
