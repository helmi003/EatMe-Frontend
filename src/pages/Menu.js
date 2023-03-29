import React, { useState,useEffect } from "react";
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
function Menu() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const dishes = useSelector(selectAllDishes);
  const dishStatus = useSelector(getDishesStatus);
  const error = useSelector(getDishesError);
  const [sortOption, setSortOption] = useState("Sort by");
  const [search, setSearch] = useState("");
  let content;
  if (dishStatus === "loading") {
    console.log("loading...")
    content = <p>Loading...</p>;
  } else if (dishStatus === "error") {
    console.log("error",error)
    content = <p>{error}</p>;
  } else {
    console.log("success")
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

    const filteredDishes = sortedDishes?.filter((dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase())
    );
    content = (
      <>
        {filteredDishes && filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => <MenuOrder key={dish._id} {...dish} />)
        ) : (
          <div>No data available</div>
        )}
      </>
    );
  }
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
            <div>
              <CheckBox
                key={item.id}
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
                      {...sandwich}
                      onClick={() => handleChecboxs(sandwich.id)}
                    />
                  ))}
              </div>
            </div>
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
