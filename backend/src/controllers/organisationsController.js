import { organisationsService } from '../services';

export const organisationsController = {
    async read_Organisation(req, res, next) {
        try {
            const result = await organisationsService.read_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async save_Organisation(req, res, next) {
        try {
            const result = await organisationsService.save_data(req.body.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async delete_Organisation(req, res, next) {
        let result;
        try {
            result = await organisationsService.delete_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

}