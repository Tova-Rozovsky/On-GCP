import { UserService } from "../service/userService.js";
import {userSchema} from "../validition/userValidation.js";

export default class UsersController {
    async getAllUser(req, res, next) {
        try {
            const service = new UserService();
            const data = await service.getByParameter(req);
            return res.json(data);  
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async getUserById(req, res, next) {
        try {
            const service = new UserService();
            const data = await service.getById(req.params.id);
            return res.json(data);  
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res,next) {
        try {
            let item =req.body;
            item.userId = req.params.id;
            const { error } = userSchema.validate(item);
            if (error) {
                return res.json({ message: error.details[0].message });
            }
            delete item.userId;
            console.log("h",item);
            const service = new UserService();
            await service.update(item, req.params.id);
            res.json(`user with id: ${req.params.id} updated successfully`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
