import React, { useState } from "react";
import classes from "../components/Layout/Layout.module.scss";
import makloub from "../assets/images/makloub.jpeg";
import Counter from "../components/Counter/Counter";
import Button from "../components/Button/Button";

function Produit(dish) {
  const [ingredients, setIngredients] = useState([
    "Ketchup",
    "Harissa",
    "Salad Mechouia",
    "Mayonnaise",
    "Salad",
    "Fries",
  ]);
  const [supplements, setSupplements] = useState([
    "lettuce",
    "Sauce barbecue",
    "Sauce with milk",
    "Tomato",
  ]);
  const [payed, setPayed] = useState([
    "Fries: 3DT",
    "Escalope: 1DT",
    "Cheese: 0.5DT",
    "Jambon: 0.5DT",
  ]);
  const handleSetIngredients = (prod) => {
    setIngredients((items) => {
      items.filter((item) => item !== prod);
    });
    setSupplements((items) => {
      items.push(prod);
    });
  };
  const handleSetSupplements = (prod) => {
    setSupplements((items) => {
      items.filter((item) => item !== prod);
    });
    setIngredients((items) => {
      items.push(prod);
    });
  };
  const handleSetPayed = (prod) => {
    setPayed((items) => {
      items.filter((item) => item !== prod);
    });
    setIngredients((items) => {
      items.push(prod);
    });
  };
  return (
    <div className={classes.container__produit}>
      <div className={classes.container__produit__left}>
        <div>
          <h2>Ingredients:</h2>
          <div className={classes.container__produit__left__produit}>
            {ingredients.map((item) => (
              <p key={item} onClick={() => handleSetIngredients(item)}>
                <span
                  className={classes.container__produit__left__produit__minuce}
                >
                  -
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2>Supplements:</h2>
          <div className={classes.container__produit__left__produit}>
            {supplements.map((item) => (
              <p key={item} onClick={() => handleSetSupplements(item)}>
                <span
                  className={classes.container__produit__left__produit__plus}
                >
                  +
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2>Payed Supplements:</h2>
          <div className={classes.container__produit__left__produit}>
            {payed.map((item) => (
              <p key={item} onClick={() => handleSetPayed(item)}>
                <span
                  className={classes.container__produit__left__produit__plus}
                >
                  +
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.container__produit__right}>
        <img src={makloub} alt="makloub" />
        <Counter
          extraStyles={{
            position: "relative",
            transform: "translateX(-50%)",
            left: "50%",
          }}
        />
        <h1>Lasagna viande hachée</h1>
        <label htmlFor="message">Special instructions:</label>
        <br />
        <div className={classes.container__produit__right__text}>
          <textarea
            rows="5"
            cols="40"
            id="message"
            name="message"
            placeholder="Write something..."
            type="text"
          />
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default Produit;
