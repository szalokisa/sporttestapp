import express from 'express';
import { dataController } from '../controllers';

const cors = require('cors');
import { verifyLocalSystem } from '../middlewares/verifyLocalSystem';
import { verifyLoginToken } from '../middlewares/verifyToken';

const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(verifyLocalSystem);
router.use(verifyLoginToken)

router.get('/', dataController.getData);
router.put('/', dataController.upsertRecords);
router.delete('/', dataController.deleteById);

export default router;
