import React from "react";
import classes from "./FavouriteDish.module.scss";
import { AiFillStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavorite,
  favorite,
  getFavoritesStatus,
  getFavoritesError,
} from "../../features/favoriteSlice";
import { toast } from "react-toastify";

function FavouriteDish(dish) {
  const dispatch = useDispatch();
  const output = window.localStorage.getItem("user");
  const user = JSON.parse(output);
  const status = useSelector(getFavoritesStatus);
  const error = useSelector(getFavoritesError);
  const handleRemoveFavorite = async () => {
    await dispatch(
      removeFavorite({ id: dish._id, body: { userId: user._id } })
    );
    if (status === "success") {
      dispatch(favorite());
      toast.success("Favourite removed successfully");
    } else if (status === "error") {
      toast.success(error);
    }
  };
  return (
    <div className={classes.FavouriteDish}>
      <img src={dish["dish"].image} alt={dish["dish"].name} />
      <h3>{dish["dish"].name}</h3>
      <p>
        {dish["dish"].category} <span>{dish["dish"].price}DT</span>
      </p>
      <div>
        {Array.from(Array(dish["dish"].stars).keys()).map((number) => (
          <AiFillStar key={number} size={30} color="#F0E24F" />
        ))}
      </div>
      <AiFillHeart
        onClick={handleRemoveFavorite}
        size={60}
        cursor="pointer"
        color="#E9313C"
        className={classes.MenuOrder__content__icon}
      />
    </div>
  );
}

export default FavouriteDish;
