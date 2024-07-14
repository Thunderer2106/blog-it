import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import React from "react";
import { Select } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(null);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const handleUploadImage = async () => {
    try {
      if (!file) {
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setimageUploadError("Image Upload Failed");
          setimageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimageUploadProgress(null);
            setimageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setimageUploadError("image Upload failed");
      setimageUploadProgress(null);
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-screen-lg mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Upload a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col  gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Add the title here.."
            required
            id="title"
            className="flex-1 "
          ></TextInput>
          <Select>
            <option value="uncategorized"> Select a category</option>
            <option value="Clothing"> Clothing </option>
            <option value="Entertainment"> Entertainment </option>
            <option value="Technology"> Tech </option>
            <option value="Politics"> Politics </option>
          </Select>
        </div>
        <div className="flex gap-4 justify-between items-center  border-4 border-teal-600 border-dotted p-3 ">
          <FileInput
            type="file"
            className="flex-1"
            accept="'image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />{" "}
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          className="h-72 mb-10"
          placeholder="Enter your content"
          required
        ></ReactQuill>
        <Button type="submit" gradientDuoTone="cyanToBlue" outline>
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
