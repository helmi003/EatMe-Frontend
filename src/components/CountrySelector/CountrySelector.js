import React from "react";
import classes from "./CountrySelector.module.scss";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

function CountrySelector({
  extraStyles,
  region,
  country,
  setRegion,
  setCountry,
}) {
  return (
    <div className={classes.CountrySelector}>
      <label >Select your country</label>
      <br />
      <CountryDropdown
        style={extraStyles}
        className={classes.CountrySelector__dropdown}
        value={country}
        onChange={setCountry}
      />
      <RegionDropdown
        blankOptionLabel="No state selected"
        defaultOptionLabel="Now select a state"
        style={extraStyles}
        className={classes.CountrySelector__dropdown}
        disableWhenEmpty={true}
        country={country}
        value={region}
        onChange={setRegion}
      />
    </div>
  );
}

export default CountrySelector;
