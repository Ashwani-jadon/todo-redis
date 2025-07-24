import express from "express";
import {addTask,deleteTask,getAllTask, updateTask} from "../Controllers/todo.controller.js";
import  isAuthenticated  from "../Middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/addtask").post(isAuthenticated,addTask);
router.route("/getalltask").get(isAuthenticated,getAllTask);
router.route("/updatetodo/:todoId").put(isAuthenticated,updateTask);
router.route("/deletetodo/:todoId").delete(isAuthenticated,deleteTask);

export default router;