import Task from "../models/task.js";

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields required!" });
    }
    const task = await Task.create({
      title,
      description,
      userId: req.user._id,
    });
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
    const tasks = await Task.find({ userId }).sort({ createdAt: 1 });
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

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Fetching Task", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedFields = {};
    const { title, description, status } = req.body;
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (status) updatedFields.status = status;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      updatedFields,
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Updated Successfully", task: updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Updating Task", error: error.message });
  }
};

export default { addTask, getTask, getTaskById, updateTask };
