import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getResponse } from "../controllers/chat.controller.js";
import router from "./post.route.js";
// router.post("/getresponse/:postSlug", getResponse);
router.post("/getresponse", getResponse);
export default router;
