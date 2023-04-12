import React from "react";
// import video_advertising from "../assets/videos/video_advertising.mp4";
import classes from "../components/Layout/Layout.module.scss";
// import ImageSlider from "../ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import location from "../assets/images/location.png";
import food from "../assets/images/food.jpg";
import couscous from "../assets/images/tunisian-food-couscous.jpg";
import mechouia from "../assets/images/tunisian-food-mechouia-salad.jpg";
import street from "../assets/images/Tunisian-Street-food.jpg";
import slogon from "../assets/images/Blogo-slogon.png";
import comma from "../assets/images/comma.png";
import tunisia from "../assets/images/tunisia.png";
import map from "../assets/images/map.png";

import { AiFillStar } from "react-icons/ai";
import Button from "../components/Button/Button";
import EatMe from "../components/EatMe/EatMe";
function Home() {
  // const slides = [
  //   "../../assets/images/home_image1.jpg",
  //   "../../assets/images/home_image1.jpg",
  // ];
  return (
    <div className={classes.container__home}>
      {/* <video width="100%" autoplay="autoplay" muted loop>
        <source src={video_advertising} type="video/mp4" />
      </video> */}
      {/* <ImageSlider slides={slides} /> */}
      <div className={classes.container__home__about}>
        <div className={classes.container__home__about__div1}>
          <div>
            <img src={location} alt="location" />
          </div>
          <div className={classes.container__home__about__div1__div2}>
            Tunisia - Beni Rabia 4015, 130 Rue Hsine Eloued Sousse
          </div>
        </div>
        <div className={classes.container__home__about__div4}>
          <div className={classes.container__home__about__div1}>
            <div>
              <img src={food} alt="food" />
            </div>
            <div className={classes.container__home__about__div1__div3}>
              <h2>About Us</h2>
              <div>
                <EatMe /> brings incredible blends of various cultures to the
                Desert Shores community in Djerba. The restaurant offers fine
                dining with a blended cultural theme of modern Tunisian cuisine.
              </div>
              <Link to="/About">
                <Button extraStyles={{ borderRadius: "0" }}>Read more</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h1>Menu</h1>
      <div className={classes.container__home__menu}>
        <div className={classes.container__home__menu__images}>
          <img src={couscous} alt="couscous" />
          <img src={mechouia} alt="mechouia" />
          <img src={street} alt="street" />
        </div>
        <div className={classes.container__home__menu__rectangle}></div>
      </div>
      <p>
        In our restaurant you will find all the tastiest foods from all over
        Tunisia, we will provide such delicious and tasty with the best service
        from our teams
      </p>
      <div className={classes.container__home__center}>
        <Link to="/Menu">
          <Button
            extraStyles={{
              borderRadius: "0",
            }}
          >
            See more
          </Button>
        </Link>
      </div>
      <div className={classes.container__home__reservation}>
        <h1>Reservation</h1>
        <p>
          Call us at (+216) 55 555 555 or book a table through Open Table
          reservations:
        </p>
        <Link to="/Reservation">
          <Button
            extraStyles={{
              borderRadius: "0",
              position: "relative",
              transform: "translateX(-50%)",
              left: "50%",
              marginBottom: "10px",
              marginTop: "50px",
            }}
          >
            Book a table
          </Button>
        </Link>
        <img src={slogon} alt="slogon" />
      </div>
      <div className={classes.container__home__reviews}>
        <h1>Reviews</h1>
        <h3>Review by - Stars</h3>
        <div className={classes.container__home__reviews__reviewer}>
          <h3>Helmi Ben Romdhane: </h3>
          <AiFillStar
            size={30}
            className={classes.container__home__reviews__reviewer__stars}
          />
          <AiFillStar
            size={30}
            className={classes.container__home__reviews__reviewer__stars}
          />
          <AiFillStar
            size={30}
            className={classes.container__home__reviews__reviewer__stars}
          />
          <AiFillStar
            size={30}
            className={classes.container__home__reviews__reviewer__stars}
          />
          <AiFillStar
            size={30}
            className={classes.container__home__reviews__reviewer__stars}
          />
        </div>
        <div className={classes.container__home__reviews__review}>
          <p>
            <img src={comma} alt="comma" />
            Tunisian cuisine is renowned for its rich and flavorful blend of
            Mediterranean, African, and Middle Eastern influences, with a focus
            on fresh ingredients and aromatic spices. Its vibrant and diverse
            culinary traditions have been shaped by a history of trade,
            conquest, and cultural exchange.
            <img
              className={classes.container__home__reviews__review__comma}
              src={comma}
              alt="comma"
            />
          </p>
        </div>
      </div>
      <div className={classes.container__home__location}>
        <img
          className={classes.container__home__location__tunisia}
          src={tunisia}
          alt="tunisia map"
        />
        <p>Tunisia - Beni Rabia 4015,130 Rue Hsine Eloued Sousse</p>
        <img
          className={classes.container__home__location__map}
          src={map}
          alt="map"
        />
      </div>
    </div>
  );
}

export default Home;
