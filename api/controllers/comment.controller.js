import Comment from "../models/comment.mode.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log("function called");
    if (userId !== req.user.id) {
      return next(errorHandler(403, "Unauthorized"));
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
