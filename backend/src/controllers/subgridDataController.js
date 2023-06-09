import { subgriddataService } from '../services';

export const subgriddataController = {
    async getsubgriddata(req, res, next) {
        let result;

        try {
            result = await subgriddataService.getsubgriddata(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
