import express from "express";
const router = express.Router();
import adminController from "../controllers/admin.js";
import {
  adminOnly,
  checkAuthentication,
} from "../middlewares/authMiddleware.js";

router
  .route("/all-users")
  .get(checkAuthentication, adminOnly, adminController.getAllUsers);

router
  .route("/all-users/:userId/tasks")
  .get(checkAuthentication, adminOnly, adminController.getUserTasks);

router
  .route("/all-users/:userId/tasks/:id")
  .delete(checkAuthentication, adminOnly, adminController.deleteUserTask);

export default router;
