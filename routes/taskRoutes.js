import express from "express";
const router = express.Router();
import {
  checkAuthentication,
  userOnly,
} from "../middlewares/authMiddleware.js";
import taskController from "../controllers/task.js";

router
  .route("/task")
  .post(checkAuthentication, userOnly, taskController.addTask)
  .get(checkAuthentication, userOnly, taskController.getTask);

export default router;
