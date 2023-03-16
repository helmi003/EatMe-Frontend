import React from "react";
import classes from "../components/Layout/Layout.module.scss";
import slogon from "../assets/images/Blogo-slogon.png";
import pizza from "../assets/images/pizza.png";
import chakchouka from "../assets/images/chakchouka.png";
import EatMe from "../components/EatMe/EatMe";

function About() {
  return (
    <div className={classes.container__about}>
      <div className={classes.container__about__logo}>
        <img src={slogon} alt="slogon" />
        <img src={pizza} alt="pizza" />
      </div>
      <div className={classes.container__about__description}>
        <img src={chakchouka} alt="chakchouka" />
        <div>
          <h1>About us</h1>
          <p>
            <EatMe/> brings incredible blends of various cultures to the Desert
            Shores community in Tunisia. The restaurant offers fine dining with
            a blended cultural theme of modern Tunisian cuisine. Eat Me's
            authentic dishes draw inspiration from early Tunisian cuisine with
            mixed European interpretations. Eat Me is located at 130 Rue Hsine
            Eloued Sousse and the hours of operation are Monday-Saturday 11:30
            a.m-10 p.m., closed Sunday. For more information, call us directly
            at 55-555-555 or visit EatMe.com or like us on Facebook at
            facebook.com/EatMe and follow us on Twitter @EatMe and Instagram at
            EatMe.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
