import express from "express";
import ManagerController from '../controllers/managerController.js'; 

const managerRouter = express.Router();

const managerController = new ManagerController();

managerRouter.get("/", managerController.getAllMembers);

export {
    managerRouter
}
