import { combodataService } from '../services';

export const combodataController = {
    async getcombodata(req, res, next) {
        let result;

        try {
            result = await combodataService.getcombodata(req.body.header);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}

export const gridcombodataController = {
    async getgridcombodata(req, res, next) {
        let result;

        try {
            result = await combodataService.getgridcombodata(req.body.header);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
