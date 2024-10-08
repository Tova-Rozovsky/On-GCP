import express from "express";
import passwordController from '../controllers/passwordController.js'

const passwordRouter = express.Router();

const password = new passwordController();

passwordRouter.get("/:id",password.getPasswordById)
passwordRouter.delete("/:id", password.deletePassword)

export {
    passwordRouter
}