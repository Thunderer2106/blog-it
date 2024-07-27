/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
const Comment = ({ comment, onLike, onEdit }) => {
  const [user, setUser] = useState({});
  const [isediting, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  console.log(user);
  const handleEdit = () => {
    setEditing(true);
    setEditedContent(comment.content);
  };
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
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
        {isediting ? (
          <>
            {" "}
            <Textarea
              rows="3"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></Textarea>
            <div className="flex justify-end gap-2 pt-2 text-md">
              <Button
                size="sm"
                outline
                onClick={() => {
                  handleSave();
                }}
              >
                Update
              </Button>
              <Button
                size="sm"
                outline
                onClick={() => {
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {" "}
            <p className="text-gray-500 mb-2">{comment.content}</p>
            <div className="flex items-center gap-2 border-t pt-2 dark:border-gray-700 max-w-fit">
              <button
                type="button"
                className={` hover:text-blue-500 ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  onLike(comment._id);
                }}
              >
                <FaThumbsUp />
              </button>{" "}
              <p className="text-gray-400">
                {comment.numberofLikes > 0 &&
                  comment.numberofLikes +
                    " " +
                    (comment.numberofLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
