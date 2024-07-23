import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
import { createComment } from "../controllers/comment.controller.js";
router.post("/create", verifyToken, createComment);
export default router;
