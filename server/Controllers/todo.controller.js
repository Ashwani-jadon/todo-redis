import {Todo} from "../Models/todo.model.js"

export const addTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Enter title and description properly",
            });
        }

        // prevent dupplicacy of task
        const existingTask=await Todo.findOne({title,description});

        if(existingTask){
            return res.status(409).json({
                success:false,
                message:"task already exist with the title or description"
            })
        }


        const data = await Todo.create({
            title,
            description, 
        });

        return res.status(201).json({
            success: true, 
            message: "Task added successfully",
            data,
        });

    } catch (error) {
        console.log("Error adding task:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Todo.find();

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
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
    const todoId = req.params.todoId;
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

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask,
        });

    } catch (error) {
        console.log("Error updating task:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const deleteTask = async (req, res) => {
    const todoId = req.params.todoId;

    try {
        // Fetch the task before deleting it (optional)
        const deletedTask = await Todo.findById(todoId);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // Delete the task
        await Todo.findByIdAndDelete(todoId);

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            deletedTask,
        });

    } catch (error) {
        console.log(error);
    }
};
