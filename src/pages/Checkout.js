import React, { useState } from "react";
import { dishesList } from "../assets/utils/config";
import Button from "../components/Button/Button";
import CheckBox from "../components/CheckBox/CheckBox";
import CountrySelector from "../components/CountrySelector/CountrySelector";
import DropDown from "../components/DropDown/DropDown";
import Input from "../components/Input/Input";
import classes from "../components/Layout/Layout.module.scss";
import PhoneNumber from "../components/PhoneNumber/PhoneNumber";

function Checkout() {
  const output = window.localStorage.getItem("user");
  const user = JSON.parse(output);
  const [isChecked, setIsChecked] = useState(false);
  const [values, setValues] = useState({
    discount: { code: "E5gdQ23", price: 5 },
    name: isChecked ? user.username : "",
    number: isChecked ? user.phone : null,
    address: isChecked ? user.address : "",
    country: isChecked ? user.country : "",
    code: isChecked ? user.postal : "",
    state: isChecked ? user.state : "",
    region: isChecked ? user.region : "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const dishes = dishesList;
  const delivery = 7;
  const [sortOption, setSortOption] = useState("payment option");
  const options = ["Debit", "Cash"];
  const total = dishes.reduce(
    (acc, dish) => parseFloat(acc + dish.quantity * dish.price),
    0
  );
  const totalPrice = total - values["discount"].price + delivery;
  return (
    <div className={classes.container__checkout}>
      <h1>Checkout</h1>
      <div className={classes.container__checkout__content}>
        <div className={classes.container__checkout__content__billing}>
          <h2>Billing information</h2>
          <br />
          <h3>Personal information:</h3>
          <br />
          <Input
            extraStyles={{ backgroundColor: "#F0F0F7" }}
            id="name"
            name="name"
            type="text"
            label="Full name"
            placeholder="Enter your full name"
            errorMessage="Only alphabets, spaces and numbers are allowed and the length should be between 3 and 30"
            pattern="^[A-Za-z0-9 ]{3,30}$"
            required
            value={values["name"]}
            onChange={onChange}
          />
          <PhoneNumber
            value={values["number"]}
            label="Phone number"
            onChange={onChange}
          />
          <Input
            extraStyles={{ backgroundColor: "#F0F0F7" }}
            id="address"
            name="address"
            type="text"
            label="Address - Street"
            placeholder="Enter your address or street"
            required
            value={values["address"]}
            onChange={onChange}
          />
          <CountrySelector
            extraStyles={{ backgroundColor: "#F0F0F7", fontSize: 15 }}
            region={values["state"]}
            country={values["country"]}
            setRegion={(state) => setValues((prev) => ({ ...prev, state }))}
            setCountry={(country) =>
              setValues((prev) => ({ ...prev, country }))
            }
          />
          <div
            className={classes.container__checkout__content__billing__region}
          >
            <Input
              extraStyles={{ backgroundColor: "#F0F0F7", width: "160px" }}
              id="zip"
              name="zip"
              type="text"
              label="Zip code"
              placeholder="Enter your zip code"
              required
              value={values["code"]}
              onChange={onChange}
            />
            <Input
              extraStyles={{ backgroundColor: "#F0F0F7", width: "160px" }}
              id="region"
              name="region"
              type="text"
              label="Region"
              placeholder="Enter your region"
              required
              value={values["region"]}
              onChange={onChange}
            />
          </div>
          <DropDown
            extraStyles={{ width: "220px" }}
            selected={sortOption}
            setSelected={setSortOption}
            options={options}
          />
          {user && (
            <>
              <br />
              <CheckBox
                id="sameInfoCheckbox"
                name="sameInfo"
                value="sameInfo"
                label="Same as profil Information"
                check={isChecked}
                onClick={() => setIsChecked(!isChecked)}
              />
            </>
          )}

          <br />
          <h3>Payment information:</h3>
          <Button
            extraStyles={{
              position: "relative",
              transform: "translateX(-50%)",
              left: "50%",
              marginBottom: "10px",
            }}
          >
            Confirm payment
          </Button>
        </div>
        <div className={classes.container__checkout__content__cart}>
          <h2>Your cart</h2>
          <br />
          {dishes.map((dish) => (
            <div>
              <div className={classes.container__checkout__content__cart__dish}>
                <h4>
                  {dish.quantity} {dish.name}
                </h4>
                <h4>{dish.price * dish.quantity}DT</h4>
              </div>
              <p>{dish.type}</p>
            </div>
          ))}
          <div>
            <div className={classes.container__checkout__content__cart__dish}>
              <h4>Delivery</h4>
              <h4>{delivery} DT</h4>
            </div>
            <p></p>
          </div>
          {values["discount"].code !== "" && (
            <div
              className={classes.container__checkout__content__cart__discount}
            >
              <div className={classes.container__checkout__content__cart__dish}>
                <h4>Discount</h4>
                <h4>{values["discount"].price}DT</h4>
              </div>
              <p>#{values["discount"].code}</p>
            </div>
          )}
          <hr />
          <div className={classes.container__checkout__content__cart__total}>
            <h4>Total price:</h4>
            <h4>{totalPrice}DT</h4>
          </div>
          <div className={classes.container__checkout__content__cart__total}>
            <Input
              extraStyles={{ backgroundColor: "#F0F0F7", width: "200px" }}
              id="discount"
              name="discount"
              type="text"
              placeholder="Enter your discount code"
              value={values["discount"].code}
              onChange={onChange}
            />
            <Button>Redeem</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
