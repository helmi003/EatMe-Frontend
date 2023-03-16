import React from "react";
import { dishesList } from "../../../assets/utils/config";
import FavouriteDish from "../../../components/FavouriteDish/FavouriteDish";
import classes from "../../../components/Layout/Layout.module.scss";

function Favourites() {
  const dishes = dishesList;
  return (
    <div className={classes.container__favourite}>
      <h1>Favourites</h1>
      <br />
      <div className={classes.container__favourite__dish}>
        {dishes.map((dish) => (
          <FavouriteDish key={dish.id} {...dish}/>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
