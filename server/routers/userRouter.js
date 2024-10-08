import express from "express";
import userController from '../controllers/userController.js'

const userRouter = express.Router();

const users = new userController();
userRouter.get("/",users.getAllUser)
userRouter.get("/:id",users.getUserById)
userRouter.put("/:id", users.updateUser)

export {
    userRouter
}