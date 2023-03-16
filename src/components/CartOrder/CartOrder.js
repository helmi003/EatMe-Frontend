import React from "react";
import classes from "./CartOrder.module.scss";
import image from "../../assets/images/makloub.jpeg";
import { Link } from "react-router-dom";
import Counter from "../Counter/Counter";
import { IoMdClose } from "react-icons/io";

function CartOrder(dish) {
  return (
    <div className={classes.cartOrder}>
      <div className={classes.cartOrder__content}>
        <Link to="/Produit">
          <img src={image} alt="makloub" />
        </Link>
        <div>
          <h2>{dish.name}</h2>
          <h5>{dish.type}</h5>
        </div>
        <Counter quantity={dish.quantity} />
        <p>{dish.price}DT</p>
        <IoMdClose size={30} cursor="pointer" />
      </div>
      <hr />
    </div>
  );
}

export default CartOrder;
