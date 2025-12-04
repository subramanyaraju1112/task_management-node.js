import express from "express";
const router = express.Router();
import authController from "../controllers/auth.js";
import { checkAuthentication } from "../middlewares/authMiddleware.js";

router.route("/sign-up").post(authController.handleSignupUser);
router.route("/sign-in").post(authController.handleSigninUser);
router
  .route("/logout")
  .post(checkAuthentication, authController.handleLogoutUser);

export default router;
