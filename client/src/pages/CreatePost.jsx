import { Button, FileInput, TextInput } from "flowbite-react";
import React from "react";
import { Select } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreatePost = () => {
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
          <FileInput type="file" className="flex-1" accept="'image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload
          </Button>
        </div>
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
