import React, { useState } from "react";
import classes from "./Dialog.module.scss";
import Button from "../Button/Button";
import { ImCancelCircle } from "react-icons/im";
import { MdDoneOutline } from "react-icons/md";

function Dialog({ openDialog, setOpenDialog, profilePic, name }) {
  const [userImage, setUserImage] = useState();
  const handleUpdateImage = () => {
    setOpenDialog(false);
  };
  const handleImageInput = (event) => {
    setUserImage(event.target.files[0]);
  };

  return (
    <div className={classes.Dialog}>
      <ImCancelCircle
        size={20}
        className={classes.Dialog__icon}
        onClick={() => {
          setOpenDialog(false);
        }}
      />
      {userImage ? (
        <img
          className={classes.Dialog__image}
          src={URL.createObjectURL(userImage)}
          alt={name}
        />
      ) : (
        <img className={classes.Dialog__image} src={profilePic} alt={name} />
      )}

      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleImageInput}
      />
      <div>
        <Button
          onClick={handleUpdateImage}
          extraStyles={{
            position: "relative",
            transform: "translateX(-50%)",
            left: "50%",
            alignItems: "center",
            display: "flex",
            gap: "10px",
          }}
        >
          <MdDoneOutline className={classes.Dialog__buttons__icons} /> Update
          image
        </Button>
      </div>
    </div>
  );
}

export default Dialog;
