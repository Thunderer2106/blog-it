/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
        console.log("hi");
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex flex-row p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3 ">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-600"
        ></img>
      </div>
      <div className="flex-1 ">
        <div className="flex mb-1 items-center">
          <span className="mr-2 font-bold truncate">
            {" "}
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-sm text-gray-400">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
