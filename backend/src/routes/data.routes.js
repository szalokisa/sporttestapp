import express from 'express';
import { dataController } from '../controllers';

const cors = require('cors');
// import { verifyToken } from '../middlewares/verifyToken';
import { verifyLoginToken } from '../middlewares/verifyToken';

const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(verifyLoginToken);
router.put('/', dataController.saveData);
router.get('/', dataController.getData);

export default router;
