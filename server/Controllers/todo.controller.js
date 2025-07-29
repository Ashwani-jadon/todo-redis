import { Todo } from "../Models/todo.model.js";
import redisCleint from "../Utils/redis.js";

const cacheKey = "allTasks"; // centralize cache key

export const addTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Enter title and description properly",
      });
    }

    const existingTask = await Todo.findOne({ title, description });
    if (existingTask) {
      return res.status(409).json({
        success: false,
        message: "Task already exists with the title or description",
      });
    }

    const data = await Todo.create({ title, description });

    await redisCleint.del(cacheKey); // invalidate cache

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      data,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getAllTask = async (req, res) => {
  try {
    const cachedTask = await redisCleint.get(cacheKey);

    if (cachedTask) {
      return res.status(200).json({
        success: true,
        message: "Tasks fetched from Redis cache",
        tasks: JSON.parse(cachedTask),
      });
    }

    const tasks = await Todo.find();

    await redisCleint.set(cacheKey, JSON.stringify(tasks), 'EX', 60); // TTL = 60s

    return res.status(200).json({
      success: true,
      message: "Tasks fetched from DB",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const updateTask = async (req, res) => {
  const { todoId } = req.params;
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const updatedTask = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await redisCleint.del(cacheKey);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const deleteTask = async (req, res) => {
  const { todoId } = req.params;

  try {
    const deletedTask = await Todo.findById(todoId);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await Todo.findByIdAndDelete(todoId);

    await redisCleint.del(cacheKey);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




 // using node cache-->
    // // ✅ Try to get from cache first
    // const cachedData = cache.get(cacheKey);
    // if (cachedData) {
    //   console.log("Serving from cache");
    //   return res.status(200).json({
    //     success: true,
    //     message: "Tasks fetched from cache",
    //     tasks: cachedData,
    //   });
    // }
