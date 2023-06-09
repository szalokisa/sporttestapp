import { sportabilitiesService } from '../services';

export const sportabilitiesController = {
    async read_SportAbilities(req, res, next) {
        try {
            const result = await sportabilitiesService.read_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async save_SportAbilities(req, res, next) {
        try {
            const result = await sportabilitiesService.save_data(req.body.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async delete_SportAbilities(req, res, next) {
        let result;
        try {
            result = await sportabilitiesService.delete_data(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
