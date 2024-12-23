import express from "express";
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controller.js";
import { signout } from "../controllers/user.controller.js";
import { getUsers } from "../controllers/user.controller.js";
import { getUser } from "../controllers/user.controller.js";
import { UpgradetoAdmin } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.put("/upgrade/:userId",verifyToken,UpgradetoAdmin);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.delete("/deleteusers/:userId");
router.get("/:userId", getUser);
export default router;
