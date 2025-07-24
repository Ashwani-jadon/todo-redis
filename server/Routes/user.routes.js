import express from "express";
import {login, logout, signUp}  from "../Controllers/user.controller.js"; 
import  isAuthenticated  from "../Middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);


export default router;
