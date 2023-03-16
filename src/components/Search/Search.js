import React from "react";
import classes from "./Search.module.scss";
import { BiSearchAlt } from "react-icons/bi";

function Search({ value, onChange }) {
  return (
    <div className={classes.search}>
      <BiSearchAlt size={25} className={classes.search__icon} />
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
