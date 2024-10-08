import express from "express";
import requestController from "../controllers/requestController.js";

const requestRouter = express.Router();
const requests = new requestController();

requestRouter.get("/:type", requests.getAllRequests);
requestRouter.get("/:id", requests.getUserById);
requestRouter.put("/:id", requests.updateRequest);
requestRouter.post("/", requests.postRequest);

export {
    requestRouter,
};
