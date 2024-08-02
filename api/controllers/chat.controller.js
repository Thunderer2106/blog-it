import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

export const getResponse = async (req, res, next) => {
  try {
    console.log(req.body.slug);
    const post = await Post.find({ slug: req.body.slug });
    const bloginfo = post[0].content;

    const blogbot_context = `You are an assistant knowledgeable about the following blog content. Please answer questions based on the information provided.

    Blog Content:
    "${bloginfo}"

    Use the above content to answer any questions the user may have.`;
    const endpoint = "https://interbotapikey.openai.azure.com/";
    const apii = "15dc6b3b54fb4b00b9c860104f378122";

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apii));

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
