/* eslint-disable react/prop-types */
import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const navigate = useNavigate();
  console.log(comments);
  // const handleLike = async (commentId) => {
  //   try {
  //     if (!currentUser) {
  //       navigate("/sign-in");
  //       return;
  //     }
  //     const res = await fetch(`/api/comment/likeComment/${commentId}`, {
  //       method: "PUT",
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       setComments(
  //         comments.map((comment) =>
  //           comment._id === commentId
  //             ? {
  //                 ...comment,
  //                 likes: data.likes,
  //                 numberOfLikes: data.likes.length,
  //               }
  //             : comment
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberofLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  //   useEffect(() => {
  //     const getComments = async () => {
  //       try {
  //         const res = await fetch(`api/comment/getPostComments/${postId}`);
  //         if (res.ok) {
  //           const data = await res.json();
  //           setComment(data);
  //         }
  //       } catch (error) {
  //         console.log("hi");
  //         console.log(error.message);
  //       }
  //     };
  //     getComments();
  //   }, [postId]);
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  return (
    <div className="items-center w-full mx-auto p-5 max-w-3xl">
      {currentUser ? (
        <div className="flex flex-row gap-1 my-5 text-lg items-center">
          <p>Signed in as: </p>
          <img
            src={currentUser.profilePicture}
            alt="currentUser.username"
            className="w-8 h-8 rounded-full "
          ></img>
          <Link
            className="text-base text-cyan-600 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-600 p-4 shadow-md rounded-lg"
        >
          <Textarea
            placeholder="add your comment here..."
            maxLength="200"
            rows="5"
            className="text-base"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></Textarea>
          <div className="flex flex-row justify-between my-3">
            <p className="text-gray-500 text-base">
              {200 - comment.length} characters remaining
            </p>
            <Button gradientDuoTone="purpleToBlue" outline type="Submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              // onDelete={(commentId) => {
              //   setShowModal(true);
              //   setCommentToDelete(commentId);
              // }}
            />
          ))}
        </>
      )}
    </div>
  );
};
