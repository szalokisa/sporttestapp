import { exercisesService } from '../services';

export const exercisesController = {
    async read_Exercises(req, res, next) {
        try {
            const result = await exercisesService.read_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async save_Exercises(req, res, next) {
        try {
            const result = await exercisesService.save_data(req.body.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async save_ResToEx(req, res, next) {
        try {
            const result = await exercisesService.save_restoex(req.body.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async delete_Exercises(req, res, next) {
        let result;
        try {
            result = await exercisesService.delete_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
