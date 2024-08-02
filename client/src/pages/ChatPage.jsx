// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// import { Button } from "flowbite-react";
// import { TextInput } from "flowbite-react";
// import { useChat } from "ai/react";
// import { useState } from "react";
// import { useRef, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// export function ChatPage() {
//   //   const poppins400 = Poppins({
//   //     subsets: ["latin"],
//   //     weight: ["400"],
//   //   });
//   const { postSlug } = useParams();
//   const [chats, setChats] = useState([]);
//   const [recieved, setRecieved] = useState(true);
//   const { currentUser } = useSelector((state) => state.user);
//   const [queryy, setQuery] = useState("");
//   const [details, setDetails] = useState({});
//   useEffect(() => {
//     setDetails({ ...details, slug: postSlug });
//   }, [postSlug]);
//   console.log(details);
//   const sendQuery = async (e) => {
//     e.preventDefault();
//     setRecieved(false);
//     try {
//       const res = await fetch(`/api/chat/getresponse`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(details),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setRecieved(true);
//       }
//       if (res.ok) {
//         const qm = { role: "user", content: queryy };
//         const reply = { role: "bot", content: data };
//         setQuery("");
//         setRecieved(true);
//         setChats([...chats, qm, reply]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleChange = (e) => {
//     setQuery(e.target.value);
//     setDetails({ ...details, query: e.target.value });
//   };
//   return (
//     <main className="flex flex-col max-w-7xl mx-auto h-screen  items-center bg-background relative">
//       <header className="p-4 border-b w-full max-w-5xl mx-auto">
//         <h1 className="text-2xl font-bold">BLOG Chat</h1>
//       </header>
//       {chats.length !== 0 ? (
//         chats.map((message, index) => (
//           <div key={index} className={`flex w-[94.5%] h-60 `}>
//             <div
//               className={` py-2 px-2  w-[94.5%] mx-auto text-[16px] leading-[26px] flex flex-row border-[1px] border-gray-100   ${
//                 message.role === "bot" ? " bg-neutral-50 " : "  bg-white "
//               }`}
//             >
//               <div className="w-fit mr-5">
//                 {message.role === "user" ? (
//                   <img
//                     src="https://th.bing.com/th?id=OIP.jQvFuRlmVesA7K6ArjfyrAHaH9&w=241&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
//                     alt="profile"
//                     height={50}
//                     width={50}
//                     className="rounded-full my-2 "
//                   ></img>
//                 ) : (
//                   <img
//                     // src="https://github.com/shadcn.png"
//                     src="https://th.bing.com/th/id/OIP.kW8b3-E2Zrq9HHTaeb5XfAHaFj?w=247&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
//                     alt="user image"
//                     height={50}
//                     width={40}
//                     className="rounded-full mb-2"
//                   ></img>
//                 )}
//               </div>
//               <div className="my-auto w-10/12">{message.content}</div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className={`flex `}>
//           <div
//             className={` py-3 px-3 mx-auto  w-[94.5%] text-[15px] leading-[26px] flex flex-row border-[1px] border-gray-100
//                      bg-neutral-50
//                   `}
//           >
//             <div className="w-fit mr-5">
//               <img
//                 // src="https://github.com/shadcn.png"
//                 src="https://th.bing.com/th/id/OIP.kW8b3-E2Zrq9HHTaeb5XfAHaFj?w=247&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
//                 alt="user image"
//                 height={40}
//                 width={40}
//                 className="rounded-full mb-2"
//               ></img>
//             </div>
//             <div className="my-auto w-10/12">
//               Welcome <span className="font-semibold ml-1">User</span>
//               ,
//               <br />
//               I am BLOG BOT - your guide for helping you answering through the
//               questions in the blog
//               <br /> Through dedicated research and development efforts, I have
//               gained the ability to proficiently respond to your questions in
//               the realm of blog exploration.
//               <br />
//               Feel free to go ahead and ask your first question !
//             </div>
//           </div>
//         </div>
//       )}
//       {recieved === false ? (
//         <div className="bg-blur w-[90%] p-2 fle mx-auto rounded-md shadow-md">
//           <div className="flex items-center space-x-2">
//             <div className="animate-bounce inline-block h-3 w-3 bg-blue-500 rounded-full"></div>
//             <div className="animate-bounce inline-block h-3 w-3 bg-blue-500 rounded-full"></div>
//             <div className="animate-bounce inline-block h-3 w-3 bg-blue-500 rounded-full"></div>
//           </div>
//           <p className="text-gray-600 mt-2">Thinking...</p>
//         </div>
//       ) : (
//         ""
//       )}
//       <div className="h-[81vh]"></div>
//       <div className="flex flex-col justify-center w-full items-center mx-auto">
//         <div className="flex items-center w-[60%] justify-center mb-4 mt-4">
//           <form
//             onSubmit={sendQuery}
//             className={`w-full my-auto group relative `}
//           >
//             <input
//               placeholder="Ask away.."
//               value={queryy}
//               onChange={handleChange}
//               className="rounded-full bg-white w-full hover:text-black border-2 hover:border-black focus:border-black group-hover:bg-[#e7a6e7] duration-300 py-3 focus:outline-none px-6 text-bold hover:placeholder-slate-600 focus:placeholder-slate-600 focus:bg-[#e7a6e7]"
//             ></input>
//             <button type="submit">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="absolute right-3 top-[13px] w-6 h-6 group-hover:stroke-black group-hover:scale-[1.1] duration-300 my-auto hover:cursor-pointer"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
//                 />
//               </svg>
//             </button>
//           </form>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-[26px] h-[26px] hover:fill-[#e7a6e7] duration-300 hover:cursor-pointer hover:stroke-black ml-4"
//           >
//             <path
//               fillRule="evenodd"
//               d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//       </div>

//       <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
//         <ul
//           className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
//         >
//           {chats.map((m, index) => (
//             <div key={index}>
//               {m.role === "user" ? (
//                 <li key={m.id} className="flex flex-row">
//                   <div className="rounded-xl p-4 bg-background shadow-md flex">
//                     <p className="text-primary">{m.content}</p>
//                   </div>
//                 </li>
//               ) : (
//                 <li key={m.id} className="flex flex-row-reverse">
//                   <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
//                     <p className="text-primary">{m.content}</p>
//                   </div>
//                 </li>
//               )}
//             </div>
//           ))}
//         </ul>
//       </section>
//     </main>
//   );
// }

import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function ChatPage() {
  const { postSlug } = useParams();
  const [chats, setChats] = useState([]);
  const [recieved, setRecieved] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [queryy, setQuery] = useState("");
  const [details, setDetails] = useState({});

  useEffect(() => {
    setDetails({ ...details, slug: postSlug });
  }, [postSlug]);

  console.log(details);

  const sendQuery = async (e) => {
    e.preventDefault();
    setRecieved(false);
    try {
      const res = await fetch(`/api/chat/getresponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (!res.ok) {
        setRecieved(true);
      }
      if (res.ok) {
        const qm = { role: "user", content: queryy };
        const reply = { role: "bot", content: data };
        setQuery("");
        setRecieved(true);
        setChats([...chats, qm, reply]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setDetails({ ...details, query: e.target.value });
  };

  return (
    <main className="flex flex-col max-w-7xl mx-auto h-screen items-center bg-background relative">
      <header className="p-4 border-b w-full max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">BLOG Chat</h1>
      </header>
      <section className="flex-grow w-full overflow-y-auto px-4">
        {chats.length !== 0 ? (
          chats.map((message, index) => (
            <div key={index} className={`flex w-full mb-3`}>
              <div
                className={` px-2 w-full text-[16px] leading-[26px] flex flex-row border-[1px] border-gray-100 ${
                  message.role === "bot" ? "bg-neutral-50" : "bg-white"
                }`}
              >
                <div className="w-fit mr-5">
                  {message.role === "user" ? (
                    <img
                      src="https://th.bing.com/th?id=OIP.jQvFuRlmVesA7K6ArjfyrAHaH9&w=241&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                      alt="profile"
                      height={50}
                      width={50}
                      className="rounded-full my-2"
                    ></img>
                  ) : (
                    <img
                      src="https://th.bing.com/th/id/OIP.kW8b3-E2Zrq9HHTaeb5XfAHaFj?w=247&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                      alt="user image"
                      height={50}
                      width={40}
                      className="rounded-full mb-2"
                    ></img>
                  )}
                </div>
                <div className="my-auto w-10/12">{message.content}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full mb-4">
            <div className="py-3 px-3 w-full text-[15px] leading-[26px] flex flex-row border-[1px] border-gray-100 bg-neutral-50">
              <div className="w-fit mr-5">
                <img
                  src="https://th.bing.com/th/id/OIP.kW8b3-E2Zrq9HHTaeb5XfAHaFj?w=247&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="user image"
                  height={40}
                  width={40}
                  className="rounded-full mb-2"
                ></img>
              </div>
              <div className="my-auto w-10/12">
                Welcome <span className="font-semibold ml-1">User</span>,<br />
                I am BLOG BOT - your guide for helping you answer questions in
                the blog.
                <br />
                Through dedicated research and development efforts, I have
                gained the ability to proficiently respond to your questions in
                the realm of blog exploration.
                <br />
                Feel free to go ahead and ask your first question!
              </div>
            </div>
          </div>
        )}
        {recieved === false ? (
          <div className="bg-blur w-[90%] p-2 mx-auto rounded-md shadow-md">
            <div className="flex items-center space-x-2">
              <div className="animate-bounce inline-block h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="animate-bounce inline-block h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="animate-bounce inline-block h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 mt-2">Thinking...</p>
          </div>
        ) : (
          ""
        )}
      </section>
      <div className="w-full py-4 border-t">
        <div className="flex items-center justify-center">
          <form onSubmit={sendQuery} className="w-3/4 flex items-center">
            <input
              placeholder="Ask away..."
              value={queryy}
              onChange={handleChange}
              className="rounded-full bg-white w-full hover:text-black border-2 hover:border-black focus:border-black py-3 focus:outline-none px-6 text-bold"
            />
            <button type="submit" className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
