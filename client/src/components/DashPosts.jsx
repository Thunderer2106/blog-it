/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Button, Table, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showmodal, setshowmodal] = useState(false);
  const [postIdtodelete, setPostIdtodelete] = useState();
  // console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  const handleDelete = async () => {
    setshowmodal(false);
    try {
      const res = await fetch(
        `/api/post/deleteposts/${postIdtodelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id != postIdtodelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleshowmore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full overflow-x-scroll scrollbar md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md   ">
            <Table.Head className="">
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="" key={post._id}>
                <Table.Row className="bg-white divide-y-2 dark:border-gray-700 dark:bg-gray-800  ">
                  <Table.Cell>
                    {" "}
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className=" w-20 h-10 object-cover bg-gray-500 "
                      ></img>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-black dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setshowmodal(true);
                        setPostIdtodelete(post._id);
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 "
                      to={`/update-post/${post._id}`}
                    >
                      <span className=" hover:underline cursor-pointer">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <Button
              onClick={handleshowmore}
              className="mx-auto my-5 w-full self-center items-center "
              outline
            >
              {" "}
              Show More
            </Button>
          )}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
      {
        <Modal
          show={showmodal}
          onClose={() => {
            setshowmodal(false);
          }}
          popup
          size="md"
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 ">
                {" "}
                Are you sure that you want to delete your post
              </h3>
              <div className=" flex flex-row justify-between">
                <Button color="failure" onClick={handleDelete}>
                  {" "}
                  Yes ,I am sure
                </Button>
                <Button color="gray" onClick={() => setshowmodal(false)}>
                  No,Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
};

export default DashPosts;
