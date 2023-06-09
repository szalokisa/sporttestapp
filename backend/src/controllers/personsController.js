import { personsService } from '../services';

export const personsController = {
    async read_Persons(req, res, next) {
        try {
            const result = await personsService.read_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async save_Person(req, res, next) {
        try {
            const result = await personsService.save_data(req.body.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async delete_Person(req, res, next) {
        let result;
        try {
            result = await personsService.delete_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

}