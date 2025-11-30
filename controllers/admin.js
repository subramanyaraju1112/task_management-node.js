import User from "../models/auth.js";
import Task from "../models/task.js";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({})
      .select("-password")
      .sort({ createdAt: 1 });
    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({
      message: "Users fetched successfully",
      totalUsers: allUsers.length,
      users: allUsers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userTasks = await Task.find({ userId }).sort({ createdAt: 1 });
    if (userTasks.length === 0) {
      return res.status(404).json({ message: "No Tasks Found" });
    }
    return res.status(200).json({
      message: "Tasks fetched successfully",
      totalTasks: userTasks.length,
      tasks: userTasks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

const deleteUserTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.deleteOne({ _id: taskId });
    if (!deletedTask.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

export default { getAllUsers, getUserTasks, deleteUserTask };
