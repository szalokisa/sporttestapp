import { dataService } from '../services';

export const dataController = {
    async deleteById(req, res, next) {
        try {
            await dataService.deleteById(
                req.verified,
                {
                    collection: req.headers["collection"],
                    ids: req.headers["data"],
                    userName: req.headers["userName"]
                });
            res.status(200).json({});
        } catch (error) {
            next(error);
        }
    },

    async getData(req, res, next) {
        let result;
        try {
            result = await dataService.getData(
                req.verified, {
                gridCode: req.headers['collection'],
                limit: req.headers['limit'],
                where: req.headers['filter'],
                sort: req.headers['sort'],
                language: req.headers['language'],
                pageNo: req.headers['pageno'],
                rowsPerPage: req.headers['rowsperpage']
            });
            res.status(200).json(result);
        } catch (error) {
            console.log('dataController.js (line: 34)', error);
            next(error);
        }
    },

    async upsertRecords(req, res, next) {
        let result;
        try {
            result = await dataService.upsertRecords(
                req.verified,
                {
                    collection: req.body['collection'],
                    data: req.body.Data,
                    userName: req.body['userName']
                });
            res.status(200).json(result);
        } catch (error) {
            console.log('dataController.js (line: 50)', error);
            next(error);
        }
    },
}
