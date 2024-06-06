import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, TextInput } from "flowbite-react";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" max-w-lg w-full mx-auto p-4 ">
      <h1 className=" font-medium text-4xl text-center ">Profile</h1>
      <form className="flex flex-col gap-5 pt-5 mt-10 ">
        <div className="w-32 h-32 cursor-pointer mx-auto  shadow-md rounded-full">
          <img
            alt="user"
            src={currentUser.profilePicture}
            className="rounded-full w-full h-full border-8   border-[lightgray]"
          />
        </div>
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
        <Button type="submit" gradientDuoTone="cyanToBlue" outline> Update</Button>
      </form>
      <div className="text-red-600 flex justify-between mt-5"><span className="cursor-pointer"> Delete Account</span>
      <span className="cursor-pointer"> Sign Out</span></div>
    </div>
  );
};

export default DashProfile;
