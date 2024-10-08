import express from "express";
import resetPasswordController from "../controllers/resetPasswordController.js";
const resetPasswordRouter = express.Router();

const resetPassword = new resetPasswordController();

resetPasswordRouter.post('/request-otp', resetPassword.requestOtp);
resetPasswordRouter.post('/reset-password', resetPassword.resetPassword);


export {
    resetPasswordRouter
}