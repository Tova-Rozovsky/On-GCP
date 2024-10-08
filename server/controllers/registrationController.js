import { RegistrationService } from "../service/registrationService.js";
import { loginSchema, userSchema } from "../validition/userValidation.js";

const regService = new RegistrationService();

export default class RegistrationController {

    async login(req, res, next) {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) {
                throw new Error(error.details.map(detail => detail.message).join(', '));
            }

            let result = await regService.login(req.body);
            if (result.user.length == 0) {
                throw new Error("User does not exist");
            }
            return res.json({ data: { user: result.user.userId, token: result.token } });
        } catch (ex) {
            const err = {};
            err.status = 500;
            err.message = ex.message; 
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            console.log(req.body);
            const { error } = userSchema.validate(req.body[0]);
            if (error) {
                throw new Error(error.details.map(detail => detail.message).join(', '));
            }

            const result = await regService.addUser(req.body);
            return res.json({ user: result.user, token: result.token });
        } catch (ex) {
            const err = {};
            err.status = 500;
            err.message = ex.message; 
            next(err);
        }
    }
}
