// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// import React from "react";

// const About = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-center">
//       <div className=" text-center p-3 flex flex-col gap-5 max-w-3xl mx-auto">
//         <h1 className=" font-semibold text-3xl "> About Blog</h1>
//         <div className="flex flex-col gap-7 text-xl text-gray-800">
//           <p>
//             Welcome to BLOG IT! This application is a a personal project to
//             share the thoughts and ideas with the world. I am a fullstack
//             developer who loves to write about technology, coding, and
//             everything in between.
//           </p>

//           <p>
//             On this blog, you'll find weekly articles and tutorials on topics
//             such as software development,life style,politics, etc.... I love to learn and explore new technologies, so be sure
//             to check back often for new content!.It also comes up with a BLOG BOT for better understanding of
//           </p>

//           <p>
//             We encourage you to leave comments on our posts and engage with
//             other readers. You can like other people's comments and reply to
//             them as well. We believe that a community of learners can help each
//             other grow and improve.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;


/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-light text-gray-dark">
      <div className="text-center p-3 flex flex-col gap-5 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="font-semibold text-3xl text-teal-dark">About Blog</h1>
        <div className="flex flex-col gap-7 text-xl text-gray-dark">
          <p>
            Welcome to <span className="text-teal">BLOG IT!</span> This application is a personal project to
            share thoughts and ideas with the world. I am a fullstack
            developer who loves to write about technology, coding, and
            everything in between.
          </p>

          <p>
            On this blog, you'll find weekly articles and tutorials on topics
            such as software development, life style, politics, etc. I love to learn and explore new technologies, so be sure
            to check back often for new content! It also comes with a <span className="text-coral">BLOG BOT</span> for a better understanding of blogs.
          </p>

          <p>
            We encourage you to leave comments on our posts and engage with
            other readers. You can like other people's comments and reply to
            them as well. We believe that a community of learners can help each
            other grow and improve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

