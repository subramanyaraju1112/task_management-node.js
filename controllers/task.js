import Task from "../models/task.js";

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields required!" });
    }
    const task = await Task.create({ title, description, user: req.user._id });
    return res.status(201).json({ message: "Task Successfully Created", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating Task", error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId });
    if (!tasks.length) {
      return res.status(404).json({ message: "No Tasks found" });
    }
    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Fetching Tasks", error: error.message });
  }
};

export default { addTask, getTask };
