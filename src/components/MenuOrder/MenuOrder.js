import React from "react";
import classes from "./MenuOrder.module.scss";
import { Link } from "react-router-dom";
import CheckBox from "../CheckBox/CheckBox";
import Counter from "../Counter/Counter";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

function MenuOrder({ dish, isChecked, setIsChecked, isActive, setIsActive }) {
  
  return (
    <div className={classes.MenuOrder}>
      <div className={classes.MenuOrder__menu}>
        <div className={classes.MenuOrder__content}>
          <CheckBox
            id={dish.category}
            name={dish.category}
            value={dish.category}
            check={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          />
          <Link to="/Produit" dish={dish}>
            <img src={dish.image} alt={dish.name} />
          </Link>
          <div className={classes.MenuOrder__content__details}>
            <h2>{dish.name}</h2>
            <h4>{dish.supplements.map((desc) => desc.name).join(", ")}</h4>
            <div className={classes.MenuOrder__content__details__counter}>
              <p>Quantity:</p> <Counter quantity={dish.quantity} />
            </div>
            <h5>Price: {dish.price}DT</h5>
          </div>
        </div>
        <div className={classes.MenuOrder__content__heart}>
          {isActive ? (
            <AiFillHeart
              onClick={() => {
                setIsActive(!isActive);
              }}
              size={50}
              className={classes.MenuOrder__content__icon}
            />
          ) : (
            <AiOutlineHeart
              onClick={() => {
                setIsActive(!isActive);
              }}
              size={50}
              color="black"
              className={classes.MenuOrder__content__icon}
            />
          )}
        </div>
      </div>
      <div className={classes.MenuOrder__line}></div>
    </div>
  );
}

export default MenuOrder;
