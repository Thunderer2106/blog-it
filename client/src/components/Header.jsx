import React, { useState, useEffect } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutsuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    setSearchTerm(searchTermFromUrl || "");
  }, [location.search]);

  const handlesignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutsuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-bold hover:text-gold transition duration-300">
        BLOG IT
      </Link>
      <form onSubmit={handleSubmit} className="flex items-center">
        <TextInput
          type="text"
          placeholder="Search here"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline bg-white text-gray-900 placeholder-gray-500 border-0 focus:ring-0 focus:outline-none rounded-full px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></TextInput>
      </form>
      <Button className="w-12 h-10 lg:hidden bg-coral-500 text-white rounded-full hover:bg-coral-600 transition duration-300">
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-6 md:order-2 items-center">
        <Button
          className="w-12 h-10 hidden sm:inline bg-navy-500 text-white rounded-full hover:bg-navy-600 transition duration-300"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm text-white">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate text-white">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item className="hover:bg-teal-600 transition duration-300">Profile</Dropdown.Item>
            </Link>
            <Dropdown.Item className="hover:bg-teal-600 transition duration-300" onClick={() => handlesignout()}>
              Sign Out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="cyanToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="">
        <Navbar.Link active={path === "/"} as={"div"} className="hover:text-coral-500 transition duration-300">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"} className="hover:text-coral-500 transition duration-300">
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;















// import React, { useState } from "react";
// import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
// import { Link, useLocation } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaMoon, FaSun } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { toggleTheme } from "../redux/theme/themeSlice";
// import { signoutsuccess } from "../redux/user/userSlice";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// const Header = () => {
//   const path = useLocation().pathname;
//   const location = useLocation();
//   const { currentUser } = useSelector((state) => state.user);
//   const { theme } = useSelector((state) => state.theme);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   console.log(searchTerm);
//   console.log(path);
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get("searchTerm");
//     setSearchTerm(searchTermFromUrl);
//   }, [location.search]);
//   const handlesignout = async () => {
//     try {
//       const res = await fetch(`/api/user/signout`, {
//         method: "POST",
//       });
//       const data = await res.json();
//       console.log("signingoff");
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutsuccess());
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set("searchTerm", searchTerm);
//     const searchQuery = urlParams.toString();
//     // console.log(searchQuery);
//     navigate(`/search?${searchQuery}`);
//   };
//   return (
//     <Navbar className="border-b-2">
//       <Link
//         to="/"
//         className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
//       >
//         <span>BLOG IT</span>{" "}
//       </Link>
//       <form onSubmit={handleSubmit}>
//         <TextInput
//           type="text"
//           placeholder="Search here"
//           rightIcon={AiOutlineSearch}
//           className="hidden lg:inline"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         ></TextInput>
//       </form>
//       <Button className="w-12 h-10 lg:hidden " color="gray" pill>
//         <AiOutlineSearch />
//       </Button>
//       <div className="flex gap-6 md:order-2">
//         <Button
//           className="w-12 h-10 hidden sm:inline "
//           color="gray"
//           pill
//           onClick={() => dispatch(toggleTheme())}
//         >
//           {theme === "dark" ? <FaMoon /> : <FaSun />}
//         </Button>
//         {currentUser ? (
//           <Dropdown
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar alt="user" img={currentUser.profilePicture} rounded />
//             }
//           >
//             <Dropdown.Header>
//               <span className="block text-sm">@{currentUser.username}</span>
//               <span className="block text-sm font-medium truncate ">
//                 {currentUser.email}
//               </span>
//             </Dropdown.Header>
//             <Link to={"/dashboard?tab=profile"}>
//               <Dropdown.Item>Profile</Dropdown.Item>
//             </Link>
//             <Dropdown.Item onClick={() => handlesignout()}>
//               SignOut
//             </Dropdown.Item>
//           </Dropdown>
//         ) : (
//           <Link to="/sign-in">
//             <Button gradientDuoTone="cyanToBlue" outline>
//               Sign in
//             </Button>
//           </Link>
//         )}

//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Navbar.Link active={path === "/"} as={"div"}>
//           <Link to="/">Home</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === "/about"} as={"div"}>
//           <Link to="/about">About</Link>
//         </Navbar.Link>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default Header;

