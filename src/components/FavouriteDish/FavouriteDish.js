import React, { useState } from "react";
import classes from "./FavouriteDish.module.scss";
import dishImage from "../../assets/images/dish.png";
import { AiFillStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

function FavouriteDish(dish) {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className={classes.FavouriteDish}>
      <img src={dishImage} alt="makloub" />
      <h3>{dish.name}</h3>
      <p>
      {dish.type} <span>{dish.price}DT</span>
      </p>
      <div>
        {Array.from(Array(dish.stars).keys()).map((number) => (
          <AiFillStar key={number} size={30} color="#F0E24F" />
        ))}
      </div>
      {isActive ? (
        <AiFillHeart
          onClick={() => {
            setIsActive(!isActive);
          }}
          size={60}
          cursor="pointer"
          color="#E9313C"
          className={classes.MenuOrder__content__icon}
        />
      ) : (
        <AiOutlineHeart
          onClick={() => {
            setIsActive(!isActive);
          }}
          size={60}
          color="black"
          cursor="pointer"
          className={classes.MenuOrder__content__icon}
        />
      )}
    </div>
  );
}

export default FavouriteDish;
