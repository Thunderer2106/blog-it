// import { errorHandler } from "../utils/error.js";
// import Post from "../models/post.model.js";
// import OpenAI from "openai";
// export const getResponse = async (req, res, next) => {
//   //   const interbot_context = `
//   //   [InterBot is an advanced AI-driven chatbot developed by Interain, tailored to cater to the specific needs of college students who are gearing up for the competitive world of job interviews and placements. It covers a wide array of topics crucial for interview and placement success.]

//   //   Quantitative Aptitude: [Teach and test on numerical calculations, data interpretation, mathematical problem-solving.]
//   //   English Proficiency: [Enhance language skills, grammar, vocabulary, reading comprehension, written communication.]
//   //   Logical Reasoning: [Train in logical thinking, puzzles, series, pattern recognition, deductive reasoning.]
//   //   Computer Fundamentals: [Tutor on computer concepts, software, hardware knowledge, IT terminologies.]
//   //   Domain-Specific Questions: [Provide industry-specific knowledge for domain-related interview questions.]
//   //   Psychometric Tests: [Guide on personality tests, cognitive ability tests, and other evaluations.]
//   //   Coding Challenges: [Offer practice problems, coding challenges, algorithm-based questions.]
//   //   Written English Tests: [Assist in essay writing, summarizing, critical analysis.]
//   //   Interview Tips and Techniques: [Advice on interview etiquette, body language, dressing, presentation.]
//   //   Mock Interviews: [Simulate interview scenarios, provide feedback.]

//   //   [InterBot's interactions are confined to interview preparation and placement guidance.]
//   //   `;

//   const openai = new OpenAI({
//     apiKey: "sk-proj-R4ADkJySuROCFacUMj2qT3BlbkFJeatdRnd29n7fqiyCF9ko",
//   });

//   try {
//     console.log(req.body.slug);
//     const post = await Post.find({ slug: req.body.slug });
//     const bloginfo = post[0].content;

//     const blogbot_context = `You are an assistant knowledgeable about the following blog content. Please answer questions based on the information provided.

//     Blog Content:
//     "${bloginfo}"
  
//     Use the above content to answer any questions the user may have.`;
//     console.log(post);
//     console.log(post[0].content);
//     // console.log(req.body.query);
//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: "system", content: blogbot_context },
//         { role: "user", content: req.body.query },
//       ],
//       model: "gpt-4o-mini",
//     });

//     // const res = completion.choices[0].message.content;
//     console.log(completion.choices[0]);

//     res.status(200).json("fullfiled");
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";
import { OpenAIClient,AzureKeyCredential } from "@azure/openai";

export const getResponse = async (req, res, next) => {
  //   const interbot_context = `
  //   [InterBot is an advanced AI-driven chatbot developed by Interain, tailored to cater to the specific needs of college students who are gearing up for the competitive world of job interviews and placements. It covers a wide array of topics crucial for interview and placement success.]

  //   Quantitative Aptitude: [Teach and test on numerical calculations, data interpretation, mathematical problem-solving.]
  //   English Proficiency: [Enhance language skills, grammar, vocabulary, reading comprehension, written communication.]
  //   Logical Reasoning: [Train in logical thinking, puzzles, series, pattern recognition, deductive reasoning.]
  //   Computer Fundamentals: [Tutor on computer concepts, software, hardware knowledge, IT terminologies.]
  //   Domain-Specific Questions: [Provide industry-specific knowledge for domain-related interview questions.]
  //   Psychometric Tests: [Guide on personality tests, cognitive ability tests, and other evaluations.]
  //   Coding Challenges: [Offer practice problems, coding challenges, algorithm-based questions.]
  //   Written English Tests: [Assist in essay writing, summarizing, critical analysis.]
  //   Interview Tips and Techniques: [Advice on interview etiquette, body language, dressing, presentation.]
  //   Mock Interviews: [Simulate interview scenarios, provide feedback.]

  //   [InterBot's interactions are confined to interview preparation and placement guidance.]
  //   `;

//   const openai = new OpenAI({
//     // apiKey: "sk-None-2apFziVBmyUliTzXLuN4T3BlbkFJQkxtXCR7JEMApQanj7Hq",
//     // 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
//     // new AzureKeyCredential('15dc6b3b54fb4b00b9c860104f378122')
//     apiKey: "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",
//   });

  try {
    console.log(req.body.slug);
    const post = await Post.find({ slug: req.body.slug });
    const bloginfo = post[0].content;

    const blogbot_context = `You are an assistant knowledgeable about the following blog content. Please answer questions based on the information provided.

    Blog Content:
    "${bloginfo}"

    Use the above content to answer any questions the user may have.`;
    // console.log(post);
    // console.log(post[0].content);
    // console.log(req.body.query);
    // const client = new OpenAIClient(
    //   "https://interbotapikey.openai.azure.com/",
    //   new AzureKeyCredential("15dc6b3b54fb4b00b9c860104f378122")
    const endpoint = 'https://interbotapikey.openai.azure.com/';
    const apiKey = '15dc6b3b54fb4b00b9c860104f378122';

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    const messageText = [
      {
        role: "system",
        content: "You are an AI assistant that helps people find information.",
      },
    ];
    const response = await client.getChatCompletions("InterbotNew", [
      {
        role: "system",
        content: `You are an assistant knowledgeable about the following blog content. Please answer questions based on the information provided.

    Blog Content:
    "${bloginfo}"

    Use the above content to answer any questions the user may have.`,
      },
      { role: "user", content: req.body.query },
    ]);

    console.log(response.choices[0]?.message?.content);

    res.status(200).json(response.choices[0]?.message?.content);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


