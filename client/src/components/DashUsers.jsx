/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Button, Table, TableCell, TableRow } from "flowbite-react";
import { Toast } from "flowbite-react";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { signoutsuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showmodal, setshowmodal] = useState(false);
  const [showupgrademodal, setshowupgrademodal] = useState(false);
  const [userIdtodelete, setUserIdtodelete] = useState();
  const [userIdtoUpgrade, setUserIdtoUpgrade] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  const handlesignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      console.log("signingoff");
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutsuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setshowmodal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdtodelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id != userIdtoUpgrade));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // const handleUpgrade = async () => {
  //   setshowupgrademodal(false);
  //   try {
  //     const res = await fetch(`/api/user/upgrade/${userIdtoUpgrade}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(res);
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const handleUpgrade = async () => {
    setshowupgrademodal(false);
    setIsLoading(true); // Show the loader
    try {
      const res = await fetch(`/api/user/upgrade/${userIdtoUpgrade}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      console.log(currentUser);
      console.log(userIdtoUpgrade);
      if (userIdtoUpgrade === currentUser._id) {
        console.log("going to modify the same user");
        handlesignout();
      }
      if (!res.ok) {
        setToastMessage("A admin cannot demote another admin.");
      } else {
        console.log("User upgraded successfully");

        // Re-fetch the users after a successful upgrade
        const usersResponse = await fetch(`/api/user/getusers`);
        const usersData = await usersResponse.json();
        if (usersResponse.ok) {
          setUsers(usersData.users);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };
  const clearToast = () => {
    setToastMessage(null);
  };

  const handleshowmore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 5) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full overflow-x-scroll scrollbar md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {isLoading && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      {toastMessage && (
        <div
          className={`fixed top-5 left-5 bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 animate-slide-in transition-transform transform duration-500`}
        >
          <div className="text-blue-600 font-medium">{toastMessage}</div>
          <button
            onClick={clearToast}
            className="ml-auto p-1 text-gray-400 hover:text-gray-900 focus:outline-none"
            aria-label="Close"
          >
            ✖
          </button>
        </div>
      )}
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md   ">
            <Table.Head className="">
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell> Admin </Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit Role</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="" key={user._id}>
                <Table.Row className="bg-white divide-y-2 dark:border-gray-700 dark:bg-gray-800  ">
                  <Table.Cell>
                    {" "}
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Link to={`/post/${.slug}`}> */}
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className=" w-20 h-20 object-cover rounded-full bg-gray-500 "
                    ></img>
                    {/* </Link> */}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Link
                      className="text-black dark:text-white"
                      to={`/post/${post.slug}`}
                    > */}
                    {user.username}
                    {/* </Link> */}
                  </Table.Cell>
                  <TableCell>{user.email}</TableCell>
                  <Table.Cell>
                    {user.isAdmin === true ? (
                      <FaCheck className=" text-green-500 size-5 mr-1" />
                    ) : (
                      <FaTimes className="text-red-500"></FaTimes>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setshowmodal(true);
                        setUserIdtodelete(user._id);
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setshowupgrademodal(true);
                        setUserIdtoUpgrade(user._id);
                      }}
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      Upgrade
                    </span>
                  </Table.Cell>
                  {/* <Table.Cell>
                    <Link
                      className="text-teal-500 "
                      to={`/update-post/${post._id}`}
                    >
                      <span className=" hover:underline cursor-pointer">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell> */}
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
        <p>You have no users yet</p>
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
                Are you sure that you want to delete your user
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
      {
        <Modal
          show={showupgrademodal}
          onClose={() => {
            setshowupgrademodal(false);
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
                Are you sure that you want to modify status of your user
              </h3>
              <div className=" flex flex-row justify-between">
                <Button color="success" onClick={handleUpgrade}>
                  {" "}
                  Yes ,I am sure
                </Button>
                <Button color="gray" onClick={() => setshowupgrademodal(false)}>
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

export default DashUsers;
