import { ManagerService } from "../service/managerService.js";

export default class managerController {
    async getAllMembers(req, res, next) {
        try {
            const managerservice = new ManagerService();
            const data = await managerservice.getAll();
            return res.json(data);  
        } catch (ex) {
            console.error('Error in getAllMembers:', ex);
            const err = {};
            err.statusCode = 500;
            err.message = ex.message || 'Internal Server Error';
            next(err);
        }
    }}
