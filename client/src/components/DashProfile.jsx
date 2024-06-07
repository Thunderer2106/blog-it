import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import { Alert } from "flowbite-react";
import { app } from "../firebase";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setimage] = useState(null);
  const [imgurl, setimgurl] = useState(null);
  const [ImageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [ImageFileUploadError, setImageFileUploadError] = useState(null);
  const filepickerref = useRef();
  console.log(ImageFileUploadProgress, ImageFileUploadError);
  const handleimageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      setimgurl(URL.createObjectURL(file));
    }
  };
  // console.log(imgurl);
  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);
  const uploadImage = async () => {
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setimage(null);
        setimgurl(null);
        //     // setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgurl(downloadURL);
          // setFormData({ ...formData, profilePicture: downloadURL });
          // setImageFileUploading(false);
        });
      }
    );
  };
  return (
    <div className=" max-w-lg w-full mx-auto p-4 ">
      <h1 className=" font-medium text-4xl text-center ">Profile</h1>
      <form className="flex flex-col gap-5 pt-5 mt-10 ">
        <input
          type="file"
          accept="image/*"
          onChange={handleimageChange}
          ref={filepickerref}
          className="hidden"
        ></input>
        <div
          className=" relative w-32 h-32 cursor-pointer self-center shadow-md rounded-full"
          onClick={() => filepickerref.current.click()}
        >
          {ImageFileUploadProgress && (
            <CircularProgressbar
              value={ImageFileUploadProgress || 0}
              text={`${ImageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    ImageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            alt="user"
            src={imgurl || currentUser.profilePicture}
            className="rounded-full w-full h-full border-8  border-[lightgray]"
          />
        </div>
        {ImageFileUploadError && (
          <Alert color="failure">{ImageFileUploadError}</Alert>
        )}
        <TextInput
          type="username"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
        ></TextInput>
        <Button type="submit" gradientDuoTone="cyanToBlue" outline>
          {" "}
          Update
        </Button>
      </form>
      <div className="text-red-600 flex justify-between mt-5">
        <span className="cursor-pointer"> Delete Account</span>
        <span className="cursor-pointer"> Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
