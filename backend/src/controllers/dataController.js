import { dataService } from '../services';

export const dataController = {
    async getData(req, res, next) {
        let result;
        try {
            result = await dataService.getData(req.headers);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async putOneRecord(req, res, next) {
        let result;

        try {
            result = await dataService.putOneRecord({
                collection: req.body.collection,
                data: JSON.parse(req.body.data),
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async deleteById(req, res, next) {
        try {
            console.log('dataController.deleteById', req.headers)
            await dataService.deleteById({
                collection: req.headers.collection,
                _id: req.headers.id,
            });
            res.status(200).json({});
        } catch (error) {
            next(error);
        }
    }
}
