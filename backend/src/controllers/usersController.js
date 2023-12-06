import { usersService } from '../services';

export const usersController = {
    async registerUser(req, res, next) {
        try {
            const result = await usersService.register(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async createUser(req, res, next) {
        try {
            const result = await usersService.createNew(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const result = await usersService.login(req.body.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
