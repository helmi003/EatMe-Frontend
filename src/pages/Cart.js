import React from "react";
import CartOrder from "../components/CartOrder/CartOrder";
import classes from "../components/Layout/Layout.module.scss";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import { dishesList } from "../assets/utils/config";

function Cart() {
  const dishes = dishesList;
  const totalPrice = dishes.reduce(
    (acc, dish) => parseFloat(acc + dish.quantity * dish.price),
    0
  );
  return (
    <div className={classes.container__cart}>
      <div className={classes.container__cart__shopping}>
        <div className={classes.container__cart__summary__items}>
          <h1>Shopping Cart</h1>
          <p>{dishes.length} Items</p>
        </div>
        <hr />
        {dishes.map((dish) => (
          <CartOrder key={dish.id} {...dish} />
        ))}
      </div>
      <div className={classes.container__cart__summary}>
        <h1>Summary</h1>
        <hr />
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className={classes.container__cart__summary__items}
          >
            <h4>
              {dish.quantity} {dish.name}
            </h4>
            <p>{dish.price * dish.quantity}DT</p>
          </div>
        ))}

        <div className={classes.container__cart__summary__total}>
          <h2>Total price:</h2>
          <p>
            {totalPrice}DT
          </p>
        </div>
        <Link to="/Checkout">
          <Button
            extraStyles={{
              position: "relative",
              transform: "translateX(-50%)",
              left: "50%",
            }}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
