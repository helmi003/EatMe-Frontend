import React, { useState, useEffect } from "react";
import classes from "../components/Layout/Layout.module.scss";
import Search from "../components/Search/Search";
import EatMe from "../components/EatMe/EatMe";
import Button from "../components/Button/Button";
import CheckBox from "../components/CheckBox/CheckBox";
import MenuOrder from "../components/MenuOrder/MenuOrder";
import DropDown from "../components/DropDown/DropDown";
import { menuItems, sandwichesMenuItems } from "../assets/utils/config";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllDishes,
  getDishesStatus,
  getDishesError,
  fetchDishes,
} from "../features/dishesSlice";
import Loading from "../components/Loading/Loading";
import Error from "../components/Error/Error";
import {
  favorite,
  selectAllFavorites,
  getFavoritesStatus,
} from "../features/favoriteSlice";
function Menu() {
  const dispatch = useDispatch();
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const output = window.localStorage.getItem("user");
  const user = JSON.parse(output);
  const favorites = useSelector(selectAllFavorites);
  const favoritesStatus = useSelector(getFavoritesStatus);
  console.log(isUserConnected);
  console.log(favoriteDishes);
  useEffect(() => {
    if (user && user.isConnected) {
      setIsUserConnected(true);
    }
  }, [user]);

  useEffect(() => {
    if (isUserConnected) {
      dispatch(favorite());
    }
  }, [isUserConnected, dispatch]);

  useEffect(() => {
    if (favoritesStatus === "favoriteFetched") {
      setFavoriteDishes(favorites);
    }
  }, [favoritesStatus, favorites]);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const dishes = useSelector(selectAllDishes);
  const dishStatus = useSelector(getDishesStatus);
  const error = useSelector(getDishesError);
  const [sortOption, setSortOption] = useState("Sort by");
  const [search, setSearch] = useState("");
  const [activeDishes, setActiveDishes] = useState({});
  const handleActive = (dishId, isActive) => {
    setActiveDishes({
      ...activeDishes,
      [dishId]: isActive,
    });
  };

  const [checkedDishes, setCheckedDishes] = useState({});

  const handleCheck = (dishId, isChecked) => {
    setCheckedDishes({
      ...checkedDishes,
      [dishId]: isChecked,
    });
  };

  const [checkboxs, setCheckboxs] = useState(menuItems);
  const [sandwiches, setSandwiches] = useState(sandwichesMenuItems);
  const handleChecboxs = (id) => {
    setCheckboxs((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
    setSandwiches((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
  };
  const options = [
    "Name: A to Z",
    "Name: Z to A",
    "Price: Low to High",
    "Price: High to Low",
  ];
  const selectedCategories = checkboxs
  .filter(
    (item) => item.name !== "sandwiches"
  )
    .concat(sandwiches)
    .filter((item) => item.check)
    .map((item) => item.name.toLowerCase());

  let content;

  if (dishStatus === "loading") {
    content = <Loading />;
  } else if (dishStatus === "error") {
    content = <Error>{error}</Error>;
  } else if (dishStatus === "success") {
    let sortedDishes = Array.from(dishes ?? []);
    if (sortOption === "Name: A to Z") {
      sortedDishes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Name: Z to A") {
      sortedDishes.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "Price: Low to High") {
      sortedDishes.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      sortedDishes.sort((a, b) => b.price - a.price);
    }
    const filteredDishes = sortedDishes?.filter(
      (dish) =>
        dish.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(dish.category.toLowerCase()))
    );
    content = (
      <>
        {filteredDishes && filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <MenuOrder
              key={dish._id}
              dish={dish}
              isActive={activeDishes[dish._id] || false}
              setIsActive={(isActive) => handleActive(dish._id, isActive)}
              isChecked={checkedDishes[dish._id] || false}
              setIsChecked={(isChecked) => handleCheck(dish._id, isChecked)}
            />
          ))
        ) : (
          <div>No data available</div>
        )}
      </>
    );
  }

  return (
    <div className={classes.container__menu}>
      <div className={classes.container__menu__top}>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <DropDown
          selected={sortOption}
          setSelected={setSortOption}
          options={options}
        />
        <Button>Add to cart</Button>
      </div>
      <div className={classes.container__menu__content}>
        <div className={classes.container__menu__content__aside}>
          <h1>CATEGORIES</h1>
          {checkboxs.map((item) => (
            <>
              <CheckBox
                key={item.id}
                check={item.check.toString()}
                {...item}
                onClick={() => handleChecboxs(item.id)}
              />
              <div
                className={classes.container__menu__content__aside__sandwiches}
              >
                {item.id === "sandwiches" &&
                  item.check &&
                  sandwiches.map((sandwich) => (
                    <CheckBox
                      key={sandwich.id}
                      check={item.check.toString()}
                      {...sandwich}
                      onClick={() => handleChecboxs(sandwich.id)}
                    />
                  ))}
              </div>
            </>
          ))}
        </div>
        <div className={classes.container__menu__content__container}>
          {content}
          <br />
        </div>
        <div className={classes.container__menu__content__aside}>
          <p>
            <EatMe /> provides you with the possibility to check the menu of our
            restaurant or make a delivery and even add your favourites dishes to
            your profile.
          </p>
          <p>So what are you waiting for!</p>
        </div>
      </div>
    </div>
  );
}

export default Menu;
