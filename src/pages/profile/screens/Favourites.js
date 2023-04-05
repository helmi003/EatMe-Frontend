import React, { useEffect } from "react";
import FavouriteDish from "../../../components/FavouriteDish/FavouriteDish";
import classes from "../../../components/Layout/Layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllFavorites,
  getFavoritesStatus,
  getFavoritesError,
  favorite,
} from "../../../features/favoriteSlice";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";

function Favourites() {
  const favourites = useSelector(selectAllFavorites);
  const status = useSelector(getFavoritesStatus);
  const error = useSelector(getFavoritesError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(favorite());
  }, [dispatch]);

  let content;
  if (status === "loading") {
    content = <Loading />;
  } else if (status === "error") {
    content = <Error>{error}</Error>;
  } else if (status === "success") {
    content = (
      <>
        {favourites && favourites.length > 0 ? (
          favourites.map((dish) => <FavouriteDish key={dish._id} {...dish} />)
        ) : (
          <div>No data available</div>
        )}
      </>
    );
  }
  return (
    <div className={classes.container__favourite}>
      <h1>Favourites</h1>
      <br />
      <div className={classes.container__favourite__dish}>{content}</div>
    </div>
  );
}

export default Favourites;
