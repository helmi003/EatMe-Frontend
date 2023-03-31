import React, { useRef, useEffect } from "react";
import classes from "./ProfileNav.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/authSlice";

function ProfileNav() {
  const linkRef = useRef(null);
  useEffect(() => {
    linkRef.current.focus();
  }, []);
  const output = window.localStorage.getItem('user');
  const user = JSON.parse(output)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate("/Login");
    window.location.reload();
  };
  return (
    <div className={classes.ProfileNav}>
      <div className={classes.ProfileNav__image}>
        <img src={user.image} alt={user.username} />
        <MdModeEdit
          size={30}
          color="white"
          className={classes.ProfileNav__image__icon}
        />
      </div>
      <h2>{user.username}</h2>
      <br />
      <nav>
        <Link to="/Profile" ref={linkRef}>
          <BsFillPersonFill size={40} color="#F85649" />
          Personal information
        </Link>
        <Link to="/Profile/ChangePassword">
          <AiFillLock size={40} color="#F85649" />
          Chnage password
        </Link>
        <Link to="/Profile/History">
          <FaClipboardList size={40} color="#F85649" />
          History
        </Link>
        <Link to="/Profile/Favourites">
          <AiFillHeart size={40} color="#F85649" />
          Favourites
        </Link>
        <Link onClick={handleLogout}>
          <BiLogOut size={40} color="#F85649" /> Logout
        </Link>
      </nav>
    </div>
  );
}

export default ProfileNav;
