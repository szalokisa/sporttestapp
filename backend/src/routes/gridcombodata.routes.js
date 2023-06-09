import express from 'express';
import { gridcombodataController } from '../controllers';

const cors = require('cors');
// import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();
router.use(cors());
router.use(express.json());
// router.use(verifyToken);

router.put('/', gridcombodataController.getgridcombodata);

export default router;
