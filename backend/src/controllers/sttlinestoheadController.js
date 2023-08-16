// src\controllers\sttlinestoheadController.js

import { sttlinestoheadService } from '../services';

export const sttlinestoheadController = {
    async getsttlinestohead(req, res, next) {
        let result;
        try {
            result = await sttlinestoheadService.getsttlinestohead(req.body.header);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
