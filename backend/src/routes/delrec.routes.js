import express from 'express';
import { delrecController } from '../controllers';
// import { verifyToken } from '../middlewares/verifyToken';

const cors = require('cors');

const router = express.Router();
// router.use(verifyToken);

router.use(cors());
router.use(express.json());

router.delete('/', delrecController.deleterecord);

export default router;
