import express from "express";
const router = express.Router();
import authController from "../controllers/auth.js";

router.route("/sign-up").post(authController.handleSignupUser);
router.route("/sign-in").post(authController.handleSigninUser);

export default router;
