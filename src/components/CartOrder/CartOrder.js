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
        <div className={classes.cartOrder__content__div}>
          <h3>{dish.name}</h3>
          <Counter quantity={dish.quantity} />
          <p>{dish.price}DT</p>
        </div>
        <IoMdClose size={30} cursor="pointer" style={{ marginLeft: "100px" }} />
      </div>
      <hr />
    </div>
  );
}

export default CartOrder;
