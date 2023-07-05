import { delrecService } from '../services';

export const delrecController = {
    async deleterecord(req, res, next) {
        let result;

        try {
            result = await delrecService.getdelrec(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
