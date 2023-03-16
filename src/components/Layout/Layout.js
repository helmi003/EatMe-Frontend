import React from "react";
import Copyright from "../Copyright/Copyright";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import classes from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Layout;
