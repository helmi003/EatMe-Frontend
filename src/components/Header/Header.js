import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Blogo-name.png";
import cart from "../../assets/images/cart.png";
import profile from "../../assets/images/man.png";
import Button from "../Button/Button";
import { dishesList } from "../../assets/utils/config";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };
  const dishes = dishesList;
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className={classes.header__content__logo}
          />
        </Link>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <Link to="/Menu" onClick={menuToggleHandler}>
                Menu
              </Link>
            </li>
            <li>
              <Link to="/Reservation" onClick={menuToggleHandler}>
                Reservation
              </Link>
            </li>
            <li>
              <Link to="/About" onClick={menuToggleHandler}>
                About
              </Link>
            </li>
            <li>
              <Link to="/Contact" onClick={menuToggleHandler}>
                Contact
              </Link>
            </li>
          </ul>
          <div className={classes.header__content__container}>
            <Link to="/Cart">
              <img
                src={cart}
                alt="cart"
                className={classes.header__content__container__cart}
              />
            </Link>

            <span className={classes.header__content__container__circle}>
              {dishes.length > 0 ?(dishes.length):0}
            </span>
          </div>
          <div className={classes.header__content__vertical}></div>
          <Link to="/Login">
            <Button>{"Login"}</Button>
          </Link>
          <Link to="/Profile">
            <img
              src={profile}
              alt="Profile"
              className={classes.header__content__profile}
            />
          </Link>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight color="black" onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose color="white" onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
