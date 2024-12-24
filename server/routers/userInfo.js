import express from "express";
import { createUserInfo } from "../controllers/userInfoController.js";

const router = express.Router();
console.log("swanith");
router.post("/post/userInfo", createUserInfo);
export default router;
