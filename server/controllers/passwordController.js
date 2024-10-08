import {PaswwordService} from '../service/paswwordService.js'
export default class PasswordController {

    async getPasswordById(req, res, next) {
        try {
            const service = new PaswwordService();
            const data = await service.getByuserId(req.params.id);
            return res.json(data);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 404;
            err.message = ex;
            next(err)
        }
    }

    async deletePassword(req, res,next) {
        try {
            const service = new PaswwordService();
            await service.delete(req.params.id);
            res.end(`password with id: ${req.params.id} deleted succefuly`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}