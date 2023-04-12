import React, { useEffect, useState } from "react";
import classes from "./Dialog.module.scss";
import Button from "../Button/Button";
import Compressor from "compressorjs";
import { ImCancelCircle } from "react-icons/im";
import { MdDoneOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserError,
  getUserLoading,
  getUserStatus,
  updateProfileImage,
} from "../../features/authSlice";
import Loading from "../Loading/Loading";

function Dialog({ openDialog, setOpenDialog, profilePic, name }) {
  const [userImage, setUserImage] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(getUserError);
  const status = useSelector(getUserStatus);
  const loading = useSelector(getUserLoading);
  const handleImageInput = async (event) => {
    const file = event.target.files[0];
    new Compressor(file, {
      quality: 0.6,
      success: async (compressedFile) => {
        const base64 = await convertToBase64(compressedFile);
        setUserImage(base64);
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
    // console.log(base64);
  };
  const handleUpdateImage = (e) => {
    e.preventDefault();
    if (userImage === "") {
      toast.error("You have to select an image first");
    } else {
      dispatch(updateProfileImage({ image: userImage }));
    }
  };
  useEffect(() => {
    if (status === "imageUpdated") {
      toast.success("Image updated succefully");
      setOpenDialog(false);
    } else if (status === "error") {
      toast.success(error);
    }
  }, [status, error, setOpenDialog]);
  return loading ? (
    <Loading />
  ) : (
    <div className={classes.Dialog}>
      <ImCancelCircle
        size={20}
        className={classes.Dialog__icon}
        onClick={() => {
          setOpenDialog(false);
        }}
      />
      <img
        className={classes.Dialog__image}
        src={userImage || profilePic}
        alt={name}
      />
      <form onSubmit={handleUpdateImage}>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleImageInput}
        />
        <div>
          <Button
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
      </form>
    </div>
  );
}

export default Dialog;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}