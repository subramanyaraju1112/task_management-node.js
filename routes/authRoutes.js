import express from "express";
const router = express.Router();
import handleSignupUser from "../controllers/auth.js";

router.route("/signup").post(handleSignupUser);

export default router;
